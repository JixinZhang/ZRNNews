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

@property (nonatomic, strong) NSArray *tabBarArray;

@end

@implementation ZRNNewsTabBarViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupData];
    [self setupTarBarController];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doNotification:) name:@"OpenNewsDetail" object:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setupData {
    self.tabBarArray = @[
                         @[@"新闻",@"news_day_normal",@"news_day_pressed",@"news_night_normal",@"news_night_pressed"],
                         @[@"快讯",@"live_day_normal",@"live_day_pressed",@"live_night_normal",@"live_night_pressed"],
//                         @[@"精选",@"worth_day_normal",@"worth_day_pressed",@"worth_night_normal",@"worth_night_pressed"],
//                         @[@"行情",@"quote_day_normal",@"quote_day_pressed",@"quote_night_normal",@"quote_night_pressed"],
//                         @[@"我的",@"my_day_normal",@"my_day_pressed",@"my_night_normal",@"my_night_pressed"]
                         ];
}

- (void)setupTarBarController {
    ZRNNewsViewController *newsVC = [[ZRNNewsViewController alloc] init];
    newsVC.tabBarItem.title = @"新闻";
    UINavigationController *newsRootVC = [[UINavigationController alloc] initWithRootViewController:newsVC];

    ZRNLiveNewsViewController *liveNewsVC = [[ZRNLiveNewsViewController alloc] init];
    liveNewsVC.tabBarItem.title = @"快讯";
    UINavigationController *liveRootVC = [[UINavigationController alloc] initWithRootViewController:liveNewsVC];

    
    ZRNProfileViewController *profileVC = [[ZRNProfileViewController alloc] init];
    profileVC.tabBarItem.title = @"我的";
    UINavigationController *profileRootVC = [[UINavigationController alloc] initWithRootViewController:profileVC];

    
    self.viewControllers = @[newsRootVC,
                             liveRootVC,
//                             profileRootVC
                             ];
    
    for (int i = 0; i < [self.tabBarArray count]; i ++)
    {
        UIViewController *controller = [self.viewControllers objectAtIndex:i];
        NSArray *array = [self.tabBarArray objectAtIndex:i];
        UITabBarItem *item = controller.tabBarItem;
        if (!item) {
            item = [[UITabBarItem alloc] initWithTitle:array[0] image:[UIImage imageNamed:array[1]] selectedImage:[UIImage imageNamed:array[2]]];
            item.tag = i;
            [controller setTabBarItem:item];
        }
        item.title = array[0];
        item.image = [UIImage imageNamed:array[1]];
        item.selectedImage = [UIImage imageNamed:array[2]];
    }
}

-(void)doNotification:(NSNotification *)notification {
    NSLog(@"成功收到===>通知");
    NSString *uri = notification.userInfo[@"uri"];
    uri = [uri stringByReplacingOccurrencesOfString:@"wallstreetcn.com" withString:@"jianyuweb.com"];
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
