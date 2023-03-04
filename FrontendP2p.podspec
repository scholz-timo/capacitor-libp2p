require 'json'

P2PPackage = JSON.parse(File.read(File.join(__dir__, 'package.json')))

### Temporary idea

$template = File.read(File.join(__dir__, 'podspec.template'))

$items = []

$SWTOPODSPEC = Object.new

def $SWTOPODSPEC.writePodSpec(dir, package, dependencies, fileName)
    resultingTemplate = $template
    resultingTemplate = resultingTemplate.gsub('PPPNAMEPPP', self.getName(package))
    resultingTemplate = resultingTemplate.gsub('PPPSOURCEPPP', package['location'])
    resultingTemplate = resultingTemplate.gsub('PPPDEPENDENCIESPPP', dependencies.map { |dependency| 's.dependency "' + dependency + '"' }.join("\n"))

    puts File.join(dir, fileName)
    File.write(File.join(dir, fileName), resultingTemplate)
end

def $SWTOPODSPEC.checkout(dir, package)
  unless File.exist?(dir)
    FileUtils.mkdir_p(dir)
    Dir.chdir(dir){
      %x[git clone #{package['location']} .]
      %x[git checkout #{package['state']['revision']}]
    }
  end
end

def $SWTOPODSPEC.generatePodspec(dir, package, fileName)
  self.checkout(dir, package)
  dependencies = self.resolveDependencies(dir).map { |package| self.getName(package) }

  puts dir
  self.writePodSpec(dir, package, dependencies, fileName)
end

def $SWTOPODSPEC.resolveDependencies(dir)
    unless File.exist?(File.join(dir, 'Package.resolved'))
        Dir.chdir(dir){
            begin
                try %x[swift build]
            rescue => exception
            end
        }
    end

    unless File.exist?(File.join(dir, 'Package.resolved'))
        return []
    end

    result = JSON.parse(File.read(File.join(dir, 'Package.resolved')))

    #FileUtils.rm_rf(dir)

    if result['version'] == 1
      return result['object']['pins']
    end
    
    return result['pins']
end

def $SWTOPODSPEC.copyEmptySources(out_dir)
    FileUtils.copy_entry(File.join(__dir__, 'Sources'), File.join(out_dir, 'Sources'))
end

def $SWTOPODSPEC.toPodSpec(dir, out_dir, current_spec)
    self.resolveDependencies(dir).each do | package |

        unless package['kind'] == 'remoteSourceControl'
            raise Exception.new "Package.resolved does not contain remoteSouceControl as source."
        end

        path = File.join(out_dir, self.getName(package), package['state']['revision'], self.getName(package))
        podspecName = "#{self.getName(package)}.podspec"
        #unless File.exist?(File.join(path, podspecName))
        #    self.generatePodspec(path, package, podspecName)
        #end

        podspec_path = File.join(path, podspecName)

        spec = Pod::Specification.from_file podspec_path

        #current_spec.pod spec.name, :path => podspec_path

        #$items.push(podspec_path)
        current_spec.dependency spec.name#, "#{spec.version}"
    end
end

def $SWTOPODSPEC.getName(sd)
  return sd.key?('identity') ? sd['identity'] : sd['package']
end

def $SWTOPODSPEC.registerLocal()
  return $items
end

#dependencies = $SWTOPODSPEC.toPodSpec(File.join(__dir__, 'ios', 'Plugin.xcworkspace', 'xcshareddata', 'swiftpm'))

Pod::Spec.new do |s|
  s.name = 'FrontendP2p'  
  s.version = P2PPackage['version']
  s.summary = P2PPackage['description']
  s.license = P2PPackage['license']
  s.homepage = P2PPackage['repository']['url']
  s.author = P2PPackage['author']
  s.source = { :git => P2PPackage['repository']['url'], :tag => s.version.to_s }
  s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
  s.ios.deployment_target  = '13.0'
  s.dependency 'Capacitor'
  #s.dependency 'generated-sources', '0.0.0' , :local => './generated-sources/'
  s.swift_version = '5.1'
  #$SWTOPODSPEC.toPodSpec(File.join(__dir__, 'ios', 'Plugin.xcworkspace', 'xcshareddata', 'swiftpm'), File.join(__dir__, 'generated-sources'), s)

  s.dependency "LibP2P"
  s.dependency "LibP2PWebSocket"
  
  #  s.subspec dependency['identity'] do |ss|
  #    $SWTOPODSPEC.checkout(File.join(__dir__, File.join('generated-sources', dependency['identity'], dependency['state']['revision'])), dependency)
      

  #    $SWTOPODSPEC.resolveDependencies(File.join(__dir__, File.join('generated-sources', dependency['identity'], dependency['state']['revision']))).each { |sd|
  #      ss.dependency 'FrontendP2p/' + (sd.key?('identity') ? sd['identity'] : sd['package'])
  #    }
  #  end
  #  s.dependency 'FrontendP2p/' + dependency['identity']
  #} 
end
