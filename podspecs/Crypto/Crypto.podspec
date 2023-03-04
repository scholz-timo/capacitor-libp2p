
$postinstall ||= []


$POSTINSTALL_CRYTO = Object.new

def $POSTINSTALL_CRYTO.post_install(installer)
  puts "okay3"
  installer.pods_project.targets.each do |target|

    puts target

    if target.name === 'Crypto'
      target.build_configurations.each do |config|
        config.build_settings['OTHER_SWIFT_FLAGS'] ||= ['$(inherited)', '-D CRYPTO_IN_SWIFTPM']
      end
    end
  end
end

$postinstall.push($POSTINSTALL_CRYTO)

Pod::Spec.new do |s|
    s.name = 'Crypto'  
    s.version = '0.0.0'
    s.summary = 'Generated package'
    s.license = 'NONE'
    s.homepage = 'https://veto.party/'
    s.author = 'VETO-GENERATOR-PACKAGE'
    s.source = { :git => 'https://github.com/apple/swift-crypto.git', :tag => s.version.to_s }
    s.source_files = 'Sources/Crypto/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.exclude_files = ['{.build,Tests,Examples,Sample}/**/*.*', 'Package.swift']
    s.ios.deployment_target  = '13.0'
    s.swift_version = '5.1'
  end
  