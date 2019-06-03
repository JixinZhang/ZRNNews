//
//  ZRNLiveNewsViewController.m
//  ZRNNews
//
//  Created by AlexZhang on 13/03/2018.
//  Copyright © 2018 Jixin. All rights reserved.
//

#import "ZRNLiveNewsViewController.h"

@interface ZRNLiveNewsViewController ()

@property (nonatomic, strong) UIView *contentView;

@end

@implementation ZRNLiveNewsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"快讯";
    self.view.backgroundColor = [UIColor whiteColor];
    
//    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
    NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index" withExtension:@"jsbundle"];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"ZRNLiveNews" initialProperties:nil launchOptions:nil];
    self.contentView = rootView;
    [self.view addSubview:self.contentView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UIView *)contentView {
    if (!_contentView) {
        _contentView = [[UIView alloc] initWithFrame:CGRectMake(0, KNavHeight, kScreenWidth, kScreenHeight - KNavHeight - KtabBarHeight)];
    }
    return _contentView;
}

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    self.contentView.frame = CGRectMake(0, KNavHeight, kScreenWidth, kScreenHeight - KNavHeight - KtabBarHeight);
}

@end
