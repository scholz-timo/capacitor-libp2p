Pod::Spec.new do |s|
    s.name = 'CBacktrace'  
    s.version = '0.0.0'
    s.summary = 'Generated package'
    s.license = 'NONE'
    s.homepage = 'https://veto.party/'
    s.author = 'VETO-GENERATOR-PACKAGE'
    s.source = { :git => 'https://github.com/apple/swift-crypto.git', :tag => s.version.to_s }
    s.source_files = 'Sources/CBacktrace/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.exclude_files = ['{.build,Tests,Examples,Sample}/**/*.*', 'Package.swift']
    s.ios.deployment_target  = '13.0'
    s.swift_version = '5.1'  
  end
  