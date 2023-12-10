
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

const getCategroiesFromData = (data: any) => {
  let temp: any =  {};

  for (let i = 0; i < data.length; i++){
    if (temp[data[i].name] == undefined){
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categoires = Object.keys(temp);
  categoires.unshift('All');
  return categoires;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All'){
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name == category);
    return coffeeList;
  }
};


const HomeScreen = () => {

  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const CoffeBeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(getCategroiesFromData(CoffeeList));
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));


  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex} /> */}
      {/* app header */}
      <HeaderBar title={'Home Screen'}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow: 1,
  },
});
