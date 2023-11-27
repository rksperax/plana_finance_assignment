import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DeviceInfo from 'react-native-device-info';

import {CategoryScreen, FavouriteScreen, MoreScreen} from '../screens';
import HomeStack from './home-stack';
import {COLORS, IMAGES} from '../assets';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveBackgroundColor: COLORS.white,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={tabOptions(
          IMAGES.home_selected,
          IMAGES.home_unselected,
          'Home',
          false,
        )}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={tabOptions(
          IMAGES.category_selected,
          IMAGES.category_unselected,
          'Categories',
          true,
        )}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={tabOptions(
          IMAGES.fav_selected,
          IMAGES.fav_unselected,
          'Favourite',
          true,
        )}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={tabOptions(
          IMAGES.more_selected,
          IMAGES.more_unselected,
          'More',
          true,
        )}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

const tabOptions = (
  iconActive: any,
  iconInactive: any,
  labelText: string,
  showBlackCircle: boolean,
) => ({
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <Text style={styles.label}>{focused ? '' : labelText}</Text>
  ),
  tabBarLabelStyle: styles.label,
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <>
      {focused ? (
        <View style={styles.selectedTab}>
          {showBlackCircle ? (
            <View style={styles.blackCircle}>
              <Image source={iconActive} style={styles.categorySelectedIcon} />
            </View>
          ) : (
            <Image source={iconActive} style={styles.selectedIcon} />
          )}
        </View>
      ) : (
        <Image source={iconInactive} style={styles.unSelectedIcon} />
      )}
    </>
  ),
});

const styles = StyleSheet.create({
  tabBar: {
    height: DeviceInfo.hasNotch() ? 103 : 65,
    position: 'absolute',
    bottom: 5,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  label: {
    color: COLORS.gray,
    paddingBottom: 10,
  },
  selectedTab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    marginBottom: 20,
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
  },
  selectedIcon: {
    height: 55,
    width: 55,
  },
  unSelectedIcon: {
    marginTop: 10,
    height: 25,
    width: 25,
  },
  categorySelectedIcon: {
    height: 25,
    width: 25,
  },
  blackCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: COLORS.black,
  },
});
