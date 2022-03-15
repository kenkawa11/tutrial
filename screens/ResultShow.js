import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Button, DataTable, TextInput } from 'react-native-paper';
//import {gammaln} from '../Lib/mathfunc'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

let targetcourserank;
export default function RsultShow({route}) {
    targetcourserank=route.params.targetclass;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>目標コース以上に入れる確率:{route.params.targetresult}%</Text>
            <ScrollView style={{ width: "90%" }}>
                {
                  route.params.courseposlist[0].coursename != "" ?
                        <DataTable>
                            <DataTable.Header style={{padding: 0, backgroundColor: "lightyellow" }}>
                                <DataTable.Title style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>コース</Text></DataTable.Title>
                                <DataTable.Title style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>確率</Text></DataTable.Title>
                            </DataTable.Header>
                            {route.params.courseposlist.map((arry, i) => { return arry.coursename != "" ? <Tablecomponent course={arry.coursename} pos={arry.pos} index={i} key={arry.coursename} /> : null })}
                        </DataTable>
                        : null
                }
            </ScrollView>
        </View >
    );
}


function Tablecomponent(props) {
  var colorcode;
  if (props.index % 2 === 0) {
      colorcode = "#bbb";
  }
  else {
      colorcode = "#ddd";
  }

  if(targetcourserank-1==props.index){
    var bw=2;

  }
  else{
    var bw=0;
  }

  return (

      <DataTable.Row style={{padding: 0, backgroundColor: colorcode,borderWidth:bw,borderColor:"red",borderBottomWidth:bw,borderBottomColor:"red"}}>
          <DataTable.Cell style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>{props.course}</Text></DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>{props.pos}%</Text></DataTable.Cell>
      </DataTable.Row>

  )
}




const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "lightgreen",
      alignItems: 'center',
  },
  cndinp: {
      width: "100%",
      //backgroundColor:"red",
      marginTop: hp("1.6%"),
      //backgroundColor:"lightblue"
      //backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'space-between',
  },

  cndinptxt: {
      fontSize: wp("3%"),
      //backgroundColor:"red",
      //backgroundColor:"lightblue"
      //backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'space-between',
  },

  suihei: {
      flexDirection: "row",
      fontSize: 30
  },

  rslt: {
      marginTop: hp("2%"),
      fontWeight: "bold",
      fontSize: hp('2%'),
      //backgroundColor:"lightblue",
      textAlign: "center"

  },

  title: {
      height: 60,
      width: "100%",
      fontSize: hp('3%'),
      fontWeight: 'bold',
      color: "#fff",
      backgroundColor: "indigo",
      textAlign: "center",
      textAlignVertical: "center"
  },

  tabletxt: {
      fontSize: hp('2%'),
      fontWeight: "bold"

  }
});
