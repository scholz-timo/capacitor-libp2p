require 'json'

P2PPackage = JSON.parse(File.read(File.join(__dir__, 'package.json')))

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
  s.swift_version = '5.1'

  s.dependency "LibP2P"
  s.dependency "LibP2PWebSocket"
end
