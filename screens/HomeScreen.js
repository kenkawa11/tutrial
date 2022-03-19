import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { gammaln } from '../Lib/mathfunc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CoursePossibility({ navigation }) {
    const [cnd, setCnd] = React.useState({ target: "", classnum: "", order: "", allnum: "", arufa: "" });
    const setResult = () => {
        var cndobj = InputCheckTrans(cnd);
        if (!cndobj) {
            return;
        }
        let poslist = orderposlist(cndobj.order, cndobj.kosha_course_num, cndobj.total);
        let roundposlist = adjustpercent(poslist);
        //let pos = calc(cndobj.rank, cndobj.kosha_course_num, cndobj.order, cndobj.total);
        let int_course_num = cndobj.kosha_course_num;
        let int_arufa_num = cndobj.arufa;

        var posfromlist = roundposlist.filter((value, index) => index < cndobj.rank).reduce((previousValue, currentValue) => previousValue + currentValue);
        var objlist = roundposlist.map((value, index) => { return { coursename: translationCourse(index + 1, int_arufa_num, int_course_num), pos: value } });
        var item = { targetclass: cndobj.rank, targetresult: posfromlist, courseposlist: objlist };
        navigation.navigate("ResultScreen", item);
    }

    return (
        /*         <KeyboardAvoidingView behavior={null} style={{ flex: 1 }}> */
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

            <View style={styles.cndinp}>
                <Text style={styles.cndinptxt}>
                    目標コースは、コースのランクを数値で指定、又は{"\n"}
                    アルファベットの場合はコース名（A,B..)での指定も可能。{"\n"}
                    アルファは数値で指定のみ(例:α2なら2)
                </Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    label="目標コース"
                    mode="outlined"
                    value={cnd.target}
                    dense={true}
                    onChangeText={text => setCnd({ ...cnd, target: text })}
                    style={[styles.rowtxt,{marginLeft:wp("1%")}]}
                />
                <TextInput
                    label="校舎全コース数"
                    mode="outlined"
                    value={cnd.classnum}
                    dense={true}
                    onChangeText={text => setCnd({ ...cnd, classnum: text })}
                    style={[styles.rowtxt,{marginLeft:wp("1%")}]}
                />
            </View>
            
            <View style={styles.cndinp}>
                <Text style={styles.cndinptxt}>
                    総合順位と受験者数入力
                </Text>
            </View>
            <View style={styles.row}>

                <TextInput
                    label="総合順位"
                    mode="outlined"
                    value={cnd.order}
                    dense={true}
                    onChangeText={text => setCnd({ ...cnd, order: text })}
                    style={[styles.rowtxt,{marginLeft:wp("1%")}]}

                />
                <TextInput
                    label="全受験者数"
                    mode="outlined"
                    value={cnd.allnum}
                    dense={true}
                    onChangeText={text => setCnd({ ...cnd, allnum: text })}
                    style={[styles.rowtxt,{marginLeft:wp("1%")}]}
                />
            </View>
            <View style={styles.cndinp}>
                <Text style={styles.cndinptxt}>
                    αコース数を入力。入れなくてもOKだがコース名は非表示
                </Text>
                <TextInput
                    label="αコース数（入れなくても計算可能）"
                    mode="outlined"
                    value={cnd.arufa}
                    dense={true}
                    onChangeText={text => setCnd({ ...cnd, arufa: text })}
                    style={{ fontSize: hp("2%") }}
                />
            </View>
            <View style={styles.cndinp}>
                <Button mode="contained" onPress={setResult} labelStyle={{ fontWeight: "bold", fontSize: wp("4%") }} icon="calculator">
                    実行
                </Button>
            </View>
        </ScrollView>
        /*         </KeyboardAvoidingView> */
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto"
        //backgroundColor: "yellow",
        //alignItems: 'center',
    },
    cndinp: {
        width: "100%",
        marginTop: hp("1.6%"),

    },

    cndinptxt: {
        flex:1,
        fontSize: wp("3.4%"),
    },

    suihei: {
        flexDirection: "row",
        fontSize: 30,
    },

    rslt: {
        marginTop: hp("2%"),
        fontWeight: "bold",
        fontSize: hp('2%'),
        textAlign: "center"
    },

    row:{
        flex:1,
        flexDirection:"row"
    },

    rowtxt:{
        flex:1, 
        fontSize: hp("2%")
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
        if (arufa == 1) {
            return "α"
        }
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
        classpos.push(sum * 100);
    }

    return classpos;
}

function adjustpercent(poslist) {
    var maxindex = poslist.indexOf(Math.max.apply(null, poslist));
    var roundpos = poslist.map(value => Math.round(value));
    var maxround = 100 - roundpos.filter((value, index) => index != maxindex).reduce((prev, current) => prev + current);
    roundpos[maxindex] = maxround;
    return roundpos;
}


function calcpossibility(koshaorder, course_num, order, total) {
    if (koshaorder > order) {
        return 0;
    }
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



function InputCheckTrans(cnd) {
    var bet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var targetcourse = toHalfWidth(cnd.target.trim());
    var order = parseFloat(toHalfWidth(cnd.order.trim()));
    var total = parseFloat(toHalfWidth(cnd.allnum.trim()))
    var course_num = parseFloat(toHalfWidth(cnd.classnum.trim()))

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
        target_class_num = parseFloat(toHalfWidth(targetcourse))
        if (!target_class_num) {
            alert("目標コース英数か確認してください");
            return null;
        }
    }

    if (target_class_num > course_num || target_class_num < 1) {
        alert("目標コースが校舎コース範囲にないかもしれません。逆に入れてませんか？");
        return null;
    }

    if (order > total|| total < 1 || order < 1) {
        alert("順位が受験者数を超えているかもしれません。逆に入れてませんか？");
        return null;
    }

    var arufa_half = toHalfWidth(cnd.arufa);
    let int_arufa_num = -1;

    if (!isNaN(arufa_half.trim()) && arufa_half.trim() != "") {
        int_arufa_num = Number(arufa_half);
        if (int_arufa_num > course_num) {
            int_arufa_num = -1;
        }
    }
    else {
        int_arufa_num = -1;
    }

    return { rank: target_class_num, order: order, kosha_course_num: course_num, total: total, arufa: int_arufa_num }
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
    return ((1 - pos_sum) * 100);
}


function toHalfWidth(input) {
    return input.replace(/[！-～]/g,
        function (input) {
            return String.fromCharCode(input.charCodeAt(0) - 0xFEE0);
        });
}



