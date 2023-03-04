Pod::Spec.new do |s|
    s.name = 'Metrics'  
    s.version = '0.0.0'
    s.summary = 'Generated package'
    s.license = 'NONE'
    s.homepage = 'https://veto.party/'
    s.author = 'VETO-GENERATOR-PACKAGE'
    s.source = { :git => 'https://github.com/apple/swift-metrics', :tag => s.version.to_s }
    s.source_files = 'Sources/Metrics/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.exclude_files = ['{.build,Tests,Examples,Sample}/**/*.*', 'Package.swift']
    s.ios.deployment_target  = '13.0'
    s.swift_version = '5.1'


    s.dependency "CoreMetrics", "0.0.0"
  end