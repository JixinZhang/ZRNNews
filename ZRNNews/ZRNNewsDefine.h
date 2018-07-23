//
//  ZRNNewsDefine.h
//  ZRNNews
//
//  Created by AlexZhang on 2018/7/23.
//  Copyright © 2018 Jixin. All rights reserved.
//

#ifndef ZRNNewsDefine_h
#define ZRNNewsDefine_h

#define kScreenWidth [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height

#define kDevice_Is_iPhoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)

#define KNavHeight          (kDevice_Is_iPhoneX ? 88.0 : 64.0)
#define KtabBarHeight       (kDevice_Is_iPhoneX ? 83.0 : 49.0)
#define KStatusBarHeight    (kDevice_Is_iPhoneX ? 44.0 : 20.0)
#define KBottomMargin    (kDevice_Is_iPhoneX ? 34.0 : 0)

#endif /* ZRNNewsDefine_h */
