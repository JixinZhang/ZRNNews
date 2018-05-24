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
#import "ZRNDefaultWebViewController.h"

@interface ZRNNewsTabBarViewController ()

@end

@implementation ZRNNewsTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupTarBarController];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doNotification:) name:@"OpenNewsDetail" object:nil];
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

-(void)doNotification:(NSNotification *)notification {
    NSLog(@"成功收到===>通知");
    NSString *uri = notification.userInfo[@"uri"];
//    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"成功收到===>通知" message:uri delegate:nil cancelButtonTitle:@"cancel" otherButtonTitles:@"ok", nil];
//    [alert show];
    
    UIViewController *rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
    
    UIViewController *topVC = [self topViewControllerWithRootViewController:rootVC];

    ZRNDefaultWebViewController *webVC = [[ZRNDefaultWebViewController alloc] init];
    [webVC setHidesBottomBarWhenPushed:YES];
    webVC.urlString = uri;
    [webVC loadDefaultRequest];
    [topVC.navigationController pushViewController:webVC animated:YES];
}

- (UIViewController*)topViewControllerWithRootViewController:(UIViewController*)rootViewController {
    if ([rootViewController isKindOfClass:[UITabBarController class]]) {
        UITabBarController *tabBarController = (UITabBarController *)rootViewController;
        return [self topViewControllerWithRootViewController:tabBarController.selectedViewController];
    } else if ([rootViewController isKindOfClass:[UINavigationController class]]) {
        UINavigationController* navigationController = (UINavigationController*)rootViewController;
        return [self topViewControllerWithRootViewController:navigationController.visibleViewController];
    } else if (rootViewController.presentedViewController) {
        UIViewController* presentedViewController = rootViewController.presentedViewController;
        return [self topViewControllerWithRootViewController:presentedViewController];
    } else {
        return rootViewController;
    }
}

@end
