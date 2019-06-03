//
//  RNBridgeModule.m
//  ZRNNews
//
//  Created by AlexZhang on 2018/5/24.
//  Copyright © 2018 Jixin. All rights reserved.
//

#import "RNBridgeModule.h"

@implementation RNBridgeModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNBridgeModule)
//RN跳转原生界面
RCT_EXPORT_METHOD(OpenNewsDetail:(NSString *)msg){
    NSLog(@"RN传入原生界面的数据为:%@",msg);
    dispatch_async(dispatch_get_main_queue(), ^{
        NSDictionary *userInfo = @{@"uri" : msg.length ? msg : @""};
        [[NSNotificationCenter defaultCenter]postNotificationName:@"OpenNewsDetail" object:userInfo userInfo:userInfo];
    });
}

@end
