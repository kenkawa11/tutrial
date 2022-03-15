import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Button, DataTable, TextInput } from 'react-native-paper';
import {gammaln} from '../Lib/mathfunc'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function CoursePossibility({ navigation }) {
    //const [inputdata,setInputdata]=React.useState({target:"",classnum:"",order:"",allnum:""});
    const [targetclass, setTarget] = React.useState("");
    const [classnum, setClassnum] = React.useState("");
    const [order, setOrder] = React.useState("");
    const [allnum, setAllnum] = React.useState("");
    const [arufa, setArufa] = React.useState("");
    const [rslt, setRslt] = React.useState("___");
    let iniobj = [{ coursename: "", pos: "" }];
    const [coursedata, setdata] = React.useState(iniobj);

    var setResult = () => {
        var cndobj = InputCheckTrans(targetclass, classnum, order, allnum);
        if (!cndobj) {
            return;
        }
        let poslist = orderposlist(cndobj.order, cndobj.kosha_course_num, cndobj.total);
        let pos = calc(cndobj.rank, cndobj.kosha_course_num, cndobj.order, cndobj.total);
        setRslt(pos);
        let arufa_half = toHalfWidth(arufa);
        let int_course_num = Number(toHalfWidth(classnum));
        let int_arufa_num = 0;

        if (!isNaN(arufa_half.trim()) && arufa_half.trim() != "") {
            int_arufa_num = Number(arufa_half);
            if (int_arufa_num > int_course_num) {
                int_arufa_num = 0;
            }
        }
        else {
            int_arufa_num = -1;
        }
        var objlist = poslist.map((value, index) => { return { coursename: translationCourse(index + 1, int_arufa_num, int_course_num), pos: value } });
        var item = { targetclass: cndobj.rank, targetresult: pos, courseposlist: objlist }
        const { width, height, scale } = Dimensions.get('window');
        setdata(objlist);
        navigation.navigate("ResultScreen", item);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>S塾の目標コースに入れる確率を計算</Text>
            <ScrollView style={{ width: "90%" }}>
                <View style={styles.cndinp}>
                    <Text style={styles.cndinptxt}>目標コース:{"\n"}
                        上から何番目かの数値又はアルファベットコース名で指定{"\n"}
                        アルファは数値で指定(例:α2なら2)
                    </Text>
                    <TextInput
                        label="目標コース"
                        mode="outlined"
                        value={targetclass}
                        dense={true}
                        onChangeText={text => setTarget(text)}
                    />
                </View>

                <View style={styles.cndinp}>
                    <Text style={styles.cndinptxt}>
                        在籍校舎の全コース数を入力
                    </Text>
                    <TextInput
                        label="校舎全コース数"
                        mode="outlined"
                        value={classnum}
                        dense={true}
                        onChangeText={text => setClassnum(text)}
                    />
                </View>
                <View style={styles.cndinp}>
                    <Text style={styles.cndinptxt}>
                        総合順位を入力
                    </Text>
                    <TextInput
                        label="総合順位"
                        mode="outlined"
                        value={order}
                        dense={true}
                        onChangeText={text => setOrder(text)}
                    />
                </View>
                <View style={styles.cndinp}>
                    <Text style={styles.cndinptxt}>
                        テストの全受験者数を入力
                    </Text>
                    <TextInput
                        label="全受験者数"
                        mode="outlined"
                        value={allnum}
                        dense={true}
                        onChangeText={text => setAllnum(text)}
                    />
                </View>
                <View style={styles.cndinp}>
                    <Text style={styles.cndinptxt}>
                        αコース数を入力。入れなくてもOKだがコース名は非表示
                    </Text>
                    <TextInput
                        label="αコース数"
                        mode="outlined"
                        value={arufa}
                        dense={true}
                        onChangeText={text => setArufa(text)}
                    />
                </View>
                <View style={styles.cndinp}>
                    <Button mode="contained" onPress={setResult}>
                        <Text style={{ fontSize: wp("3%") }}>計算(1回でうまくいかない場合はもう一回タッチ)</Text>
                    </Button>
                </View>
            </ScrollView>
        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
        alignItems: 'center',
    },
    cndinp: {
        width: "100%",
        marginTop: hp("1.6%"),
    },

    cndinptxt: {
        fontSize: wp("3%"),
    },

    suihei: {
        flexDirection: "row",
        fontSize: 30
    },

    rslt: {
        marginTop: hp("2%"),
        fontWeight: "bold",
        fontSize: hp('2%'),
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


function fispos(mA, mB, mC, mD, mE, mF, mG, mH, mI) {
    let posln = gammaln(mE + 1) + gammaln(mF + 1) + gammaln(mG + 1) + gammaln(mH + 1) - gammaln(mA + 1) - gammaln(mB + 1) - gammaln(mC + 1) - gammaln(mD + 1) - gammaln(mI + 1);
    let pos = Math.exp(posln);
    return pos;
}


function translationCourse(rank, arufa, totalcoursenum) {
    var bet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (arufa == -1) {
        return rank;
    }
    if (rank <= arufa) {
        return "α" + rank;
    }

    var betrank = totalcoursenum - rank
    var betname = bet.slice(betrank, betrank + 1)
    return betname;
}

function orderposlist(order, course_num, total) {
    var koshaninzu = course_num * 18;
    let orderpos = [];
    for (let i = 1; i <= koshaninzu; i++) {
        orderpos.push(calcpossibility(i, course_num, order, total));

    }
    var classpos = [];
    for (let j = 0; j < course_num; j++) {
        var head = j * 18 + 1;
        var sum = 0;
        for (var i = head; i < head + 18; i++) {
            sum += orderpos[i - 1];
        }
        classpos.push(Math.round(sum * 100));
    }
    return classpos;
}


function calcpossibility(koshaorder, course_num, order, total) {
    var upperInKosha = koshaorder - 1
    var kosha_ninzu = course_num * 18 - 1; //校舎内の自分以外の人数
    var total_order = order - 1; //自分より上の順位の人数
    var total_ninzu = total - 1; //自分以外の受験者数
    var total_lower = total_ninzu - total_order;
    var other_kousha_ninzu = total_ninzu - kosha_ninzu;
    var B;
    var C;
    var D;

    C = total_order - upperInKosha;
    B = kosha_ninzu - upperInKosha;
    D = total_lower - B;
    var pos = fispos(upperInKosha, B, C, D, kosha_ninzu, other_kousha_ninzu, total_order, total_lower, total_ninzu);
    return pos
}



function InputCheckTrans(targetclass, classnum, order, allnum) {
    var bet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var targetcourse = toHalfWidth(targetclass.trim());
    var order = parseFloat(toHalfWidth(order.trim()));
    var total = parseFloat(toHalfWidth(allnum.trim()))
    var course_num = parseFloat(toHalfWidth(classnum.trim()))
    if (isNaN(course_num)) {
        alert("校舎全コース数が数字でないかもしれません")
        return null;
    }

    if (isNaN(order)) {
        alert("総合順位が数値でないかもしれせん")
        return null;
    }


    if (isNaN(total)) {
        alert("全受験者数が数値でないかもしれせん")
        return null;
    }


    targetcourse = targetcourse.toUpperCase();
    if (isNaN(targetcourse)) {
        var num = bet.indexOf(targetcourse)
        if (num > -1) {
            var target_class_num = course_num - num
        }
        else {
            alert("目標コース英数か確認してください");
            return null;
        }
    } else {
        target_class_num = parseFloat(toHalfWidth(targetclass))
        if (!target_class_num) {
            alert("目標コース英数か確認してください");
            return null;
        }
    }

    if (target_class_num > course_num || target_class_num < 1) {
        alert("目標コースが校舎コース範囲にないかもしれません");
        return null;
    }

    return { rank: target_class_num, order: order, kosha_course_num: course_num, total: total }
}


function calc(target_class_num, course_num, order, total) {
    var kosha_ninzu = course_num * 18 - 1; //校舎内の自分以外の人数
    var target_order = target_class_num * 18.0;
    var total_order = order - 1; //自分より上の順位の人数
    var total_ninzu = total - 1; //自分以外の受験者数
    var total_lower = total_ninzu - total_order;
    var other_kousha_ninzu = total_ninzu - kosha_ninzu;
    var B;
    var C;
    var D;
    var integrate_ninzu;
    if (kosha_ninzu > total_order) {
        integrate_ninzu = total_order;
    } else {
        integrate_ninzu = kosha_ninzu;
    }
    /////自分より上の順位が校舎に何人いるか積分している。target_order以上いればそのコースには入れない
    let pos_sum = 0;
    for (var upperInKosha = target_order; upperInKosha <= integrate_ninzu; upperInKosha++) {
        C = total_order - upperInKosha;
        B = kosha_ninzu - upperInKosha;
        D = total_lower - B;
        pos_sum = pos_sum + fispos(upperInKosha, B, C, D, kosha_ninzu, other_kousha_ninzu, total_order, total_lower, total_ninzu);
    }
    return Math.round((1 - pos_sum) * 100);
}


function toHalfWidth(input) {
    return input.replace(/[！-～]/g,
        function (input) {
            return String.fromCharCode(input.charCodeAt(0) - 0xFEE0);
        });
}



