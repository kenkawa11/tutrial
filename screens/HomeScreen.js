import { array } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Button, DataTable, TextInput } from 'react-native-paper';
//import {gammaln} from '../Lib/mathfunc'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function CoursePossibility() {
    //const [inputdata,setInputdata]=React.useState({target:"",classnum:"",order:"",allnum:""});
    const [targetclass, setTarget] = React.useState("");
    const [classnum, setClassnum] = React.useState("");
    const [order, setOrder] = React.useState("");
    const [allnum, setAllnum] = React.useState("");
    const [arufa, setArufa] = React.useState("");
    const [rslt, setRslt] = React.useState("___");
    const [mpc, setMpc] = React.useState("___")
    let iniobj = [{ coursename: "", pos: "" }];
    const [coursedata, setdata] = React.useState(iniobj);

    var setResult = () => {
        var obj = calc(targetclass, classnum, order, allnum);
        if (obj) {
            let pos = obj.possibility
            let poslist = obj.problist
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

            const { width, height, scale } = Dimensions.get('window');
            setdata(objlist);

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>S塾のコースに入れる確率を計算</Text>
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
                        αコース数を入力。入れなくても計算可能だがコース名は非表示
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
                        計算(1回でうまくいかない場合はも一回タッチ)
                    </Button>
                </View>
                <View>
                    <Text style={styles.rslt}>
                        目標コース以上に入れる確率:{rslt}%
                    </Text>
                </View>
                {
                    coursedata[0].coursename != "" ?
                        <DataTable>
                            <DataTable.Header style={{ borderWidth: 2, padding: 0, backgroundColor: "lightyellow" }}>
                                <DataTable.Title style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>コース</Text></DataTable.Title>
                                <DataTable.Title style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>確率</Text></DataTable.Title>
                            </DataTable.Header>
                            {coursedata.map((arry, i) => { return arry.coursename != "" ? <Tablecomponent course={arry.coursename} pos={arry.pos} index={i} key={arry.coursename} /> : null })}
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

    return (

        <DataTable.Row style={{ borderWidth: 2, padding: 0, backgroundColor: colorcode }}>
            <DataTable.Cell style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>{props.course}</Text></DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: "center" }}><Text style={styles.tabletxt}>{props.pos}%</Text></DataTable.Cell>
        </DataTable.Row>

    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
        paddingTop: StatusBar.currentHeight,
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


function fispos(mA, mB, mC, mD, mE, mF, mG, mH, mI) {
    let posln = gammaln(mE + 1) + gammaln(mF + 1) + gammaln(mG + 1) + gammaln(mH + 1) - gammaln(mA + 1) - gammaln(mB + 1) - gammaln(mC + 1) - gammaln(mD + 1) - gammaln(mI + 1);
    //posln = GammaLN(mE + 1) + GammaLN(mF + 1) + GammaLN(mG + 1) + GammaLN(mH + 1) - GammaLN(mA + 1) - GammaLN(mB + 1) - GammaLN(mC + 1) - GammaLN(mD + 1) - GammaLN(mI + 1);
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

function orderposlist(targetclass, order, course_num, total) {
    var koshaninzu = course_num * 18;
    let orderpos = [];
    for (let i = 1; i <= koshaninzu; i++) {
        orderpos.push(calcpossibility(i, course_num, order, total));

    }
    var classpos = [];
    var maxindex = 0;
    var maxval = 0;
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
    //var target_order = target_class_num * 18.0;
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
function calc(targetclass, classnum, order, allnum) {
    var bet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var targetcourse = toHalfWidth(targetclass.trim());
    var order = parseFloat(toHalfWidth(order.trim()));
    var total = parseFloat(toHalfWidth(allnum.trim()))
    var course_num = parseFloat(toHalfWidth(classnum.trim()))
    if (isNaN(course_num)) {
        alert("校舎全コース数が数字でないかもしれません")
        return
    }

    if (isNaN(order)) {
        alert("総合順位が数値でないかもしれせん")
        return
    }


    if (isNaN(total)) {
        alert("全受験者数が数値でないかもしれせん")
        return
    }


    targetcourse = targetcourse.toUpperCase();
    if (isNaN(targetcourse)) {
        var num = bet.indexOf(targetcourse)
        if (num > -1) {
            var target_class_num = course_num - num
        }
        else {
            alert("目標コース英数か確認してください");
            return;
        }
    } else {
        target_class_num = parseFloat(toHalfWidth(targetclass))
        if (!target_class_num) {
            alert("目標コース英数か確認してください");
            return;
        }
    }

    if (target_class_num > course_num || target_class_num < 1) {
        alert("目標コースが校舎コース範囲にないかもしれません");
        return;
    }

    var mpc = orderposlist(target_class_num, order, course_num, total);
    orderposlist()
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
    return { possibility: Math.round((1 - pos_sum) * 100), problist: mpc };
}


function toHalfWidth(input) {
    return input.replace(/[！-～]/g,
        function (input) {
            return String.fromCharCode(input.charCodeAt(0) - 0xFEE0);
        });
}

function gammaln(z) {
    var p = [
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    var g = 7;
    var LN_PI = Math.log(Math.PI);

    if (z < 0.5) {
        return LN_PI - Math.log(Math.sin(Math.PI * z)) - GammaLN(1 - z);
    }
    z--;
    var x = 0.99999999999980993;

    for (var i = p.length; i--;) {
        x += p[i] / (z + i + 1);
    }

    var t = z + g + 0.5;
    return (LN_PI + Math.LN2) / 2 + Math.log(x) + (z + 0.5) * Math.log(t) - t;

}


var GammaLN = (function () {
    var p = [
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    var g = 7;
    var LN_PI = Math.log(Math.PI);

    function GammaLN(z) {
        if (z < 0.5) {
            return LN_PI - Math.log(Math.sin(Math.PI * z)) - GammaLN(1 - z);
        }

        z--;
        var x = 0.99999999999980993;

        for (var i = p.length; i--;) {
            x += p[i] / (z + i + 1);
        }

        var t = z + g + 0.5;
        return (LN_PI + Math.LN2) / 2 + Math.log(x) + (z + 0.5) * Math.log(t) - t;
    }

    return GammaLN;
});


