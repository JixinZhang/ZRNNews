//
//  ZRNNewsTabBarViewController.m
//  ZRNNews
//
//  Created by AlexZhang on 13/03/2018.
//  Copyright © 2018 Jixin. All rights reserved.
//

#import "ZRNNewsTabBarViewController.h"
#import "ZRNNewsViewController.h"
#import "ZRNLiveNewsViewController.h"
#import "ZRNProfileViewController.h"

@interface ZRNNewsTabBarViewController ()

@end

@implementation ZRNNewsTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupTarBarController];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setupTarBarController {
    ZRNNewsViewController *newsVC = [[ZRNNewsViewController alloc] init];
    newsVC.tabBarItem.title = @"新闻";
    UINavigationController *newsRootVC = [[UINavigationController alloc] initWithRootViewController:newsVC];

    ZRNLiveNewsViewController *liveNewsVC = [[ZRNLiveNewsViewController alloc] init];
    liveNewsVC.tabBarItem.title = @"快讯";
//    UINavigationController *liveRootVC = [[UINavigationController alloc] initWithRootViewController:liveNewsVC];

    
    ZRNProfileViewController *profileVC = [[ZRNProfileViewController alloc] init];
    profileVC.tabBarItem.title = @"我的";
//    UINavigationController *profileRootVC = [[UINavigationController alloc] initWithRootViewController:profileVC];

    
    self.viewControllers = @[newsRootVC,
                             liveNewsVC,
                             profileVC];
}

@end
