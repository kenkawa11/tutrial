//一般数学関数
function logfact(nn) {
	var nmax = nn;
	var lsum = 0;
	for (var i = 1; i < nmax + 1; i++) {
		lsum = lsum + Math.log(i);
	}

	return lsum;
}

function gammaln(z){
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




function pNormalDist(x, μ, σ) {
    if (μ == null) μ = 0;
    if (σ == null) σ = 1;
    if (σ < 0) return "入力エラー：σ ＞ 0";
    var σ2 = σ * σ;
    return Math.exp(-(x - μ) * (x - μ) / (2 * σ2)) / Math.sqrt(2 * Math.PI * σ2);
}


function sNormalDistStd(x) {
    var b0 = 0.2316419;
    var b1 = 0.31938153;
    var b2 = -0.356563782;
    var b3 = 1.781477937;
    var b4 = -1.821255978;
    var b5 = 1.330274429;
    var t = 1 / (1 + b0 * Math.abs(x));
    var z01 = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    var s = 1 - z01 * ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    if (x > 0) return s;
    else return 1 - s;
}


function sNormalDist(x, μ, σ) {
    if (μ == null) {
        s = sNormalDistStd(x);
        return s;
    }
    if (σ < 0) return "入力エラー：σ ＞ 0";
    var z = (x - μ) / σ;
    s = sNormalDistStd(z);
    return s;
}

function invNormalDistStd(p) {
    if ((p < 0) || (p > 1)) return "入力エラー：0<p<1";
    if ((p > 0.49999) && (p < 0.50001)) return 0;
    var q = -Math.log(4 * p * (1 - p));
    var a = [1.570796288, 0.03706987906, -0.0008364353589, -0.0002250947176,
             0.000006841218299, 0.000005824238515, -0.00000104527497, 0.00000008360937017,
            -0.000000003231081277, 0.00000000003657763036, 0.0000000000006936233982];
    var r = a[0];
    for (var i = 1; i <= 10; i++) {
        r = r + a[i] * Math.pow(q, i);
    }
    var x = Math.sqrt(q * r);
    if (p < 0.5) x = -x;
    return x;
}

function invNormalDist(p, μ, σ) {
    if ((p < 0) || (p > 1)) return "入力エラー：0<p<1";
    var x = invNormalDistStd(p);
    if (μ == null) return x;
    if (σ < 0) return "入力エラー：σ ＞ 0";
    var σ2 = σ * σ;
    x = x * Math.sqrt(σ2) + μ;
    return x;
}

function C_Sum(data) {
    var sum = 0;
    for (i = 0; i < data.length; i++) {
        sum = sum + data[i];
    }
    return (sum);
}


function P_ave(data, kukan) {
    var gsum = 0;
    for (i = 0; i < data.length; i++) {
        gsum = gsum + data[i] * kukan[i];
    }
    return gsum / C_Sum(data);
}

function P_std(data, kukan) {
    var sqrsum = 0
    var ave = P_ave(data, kukan);
    for (i = 0; i < data.length; i++) {
        sqrsum = sqrsum + data[i] * (kukan[i] - ave) * (kukan[i] - ave);
    }
    return Math.sqrt(sqrsum / C_Sum(data));

}

// 平均値の計算
function C_Ave(data) {
    return (C_Sum(data) / data.length);
}

function C_FVar(data) {
    var ave = C_Ave(data); // 平均値
    var varia = 0;
    for (i = 0; i < data.length; i++) {
        varia = varia + Math.pow(data[i] - ave, 2);
    }
    return varia / (data.length - 1);
}