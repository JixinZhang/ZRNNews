platform :ios, '9.0'

target 'ZRNNews' do
    # Pods for ZRNNews
    pod 'AFNetworking','~>3.0'

    rn_path = 'React/node_modules/react-native'
#    rn_maps_path = '../React-Native/node_modules/react-native-maps'

    pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
    pod 'React', path: rn_path, subspecs: [
    'Core',
    'CxxBridge',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket',
    'DevSupport',
    ]

#    pod 'react-native-maps', path: rn_maps_path

end
