//
//  ZRNDefaultWebViewController.h
//  ZRNNews
//
//  Created by AlexZhang on 2018/5/24.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ZRNDefaultWebViewController : UIViewController

@property (nonatomic, strong) NSString *urlString;

- (void)loadDefaultRequest;

- (void)loadRequestWithRequestURLString:(NSString *)urlString;

@end
