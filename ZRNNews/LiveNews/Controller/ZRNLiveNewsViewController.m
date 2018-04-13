//
//  ZRNLiveNewsViewController.m
//  ZRNNews
//
//  Created by AlexZhang on 13/03/2018.
//  Copyright © 2018 Jixin. All rights reserved.
//

#import "ZRNLiveNewsViewController.h"

@interface ZRNLiveNewsViewController ()

@end

@implementation ZRNLiveNewsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"Live news";
    self.view.backgroundColor = [UIColor whiteColor];
    
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
//    NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index" withExtension:@"jsbundle"];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"ZRNLiveNews" initialProperties:nil launchOptions:nil];
    self.view = rootView;

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
