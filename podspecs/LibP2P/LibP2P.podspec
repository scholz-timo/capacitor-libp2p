Pod::Spec.new do |s|
    s.name = 'LibP2P'  
    s.version = '0.0.0'
    s.summary = 'Generated package'
    s.license = 'NONE'
    s.homepage = 'https://veto.party/'
    s.author = 'VETO-GENERATOR-PACKAGE'
    s.source = { :git => 'https://github.com/apple/swift-metrics', :tag => s.version.to_s }
    s.source_files = 'Sources/LibP2P/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.exclude_files = ['{.build,Tests,Examples,Sample}/**/*.*', 'Package.swift']
    s.ios.deployment_target  = '13.0'
    s.swift_version = '5.1'

    s.dependency "COperatingSystem", "0.0.0"
    s.dependency "LibP2PCore", "0.0.0"
    s.dependency "ConsoleKit", "0.0.0"
    s.dependency "RoutingKit", "0.0.0"
    s.dependency "Backtrace", "0.0.0"
    s.dependency "Metrics", "0.0.0"
    s.dependency "SwiftEventBus"
    s.dependency "AsyncKit", "0.0.0"
    s.dependency "SwiftState"
    s.dependency "SwiftNIO"
    s.dependency "SwiftNIOExtras"
    s.dependency "SwiftNIOHTTP1" ## Not in dependencies but seems to be required.
  end