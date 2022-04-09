function r(r, n) {
    var t = e(r);
    t.length > 16 && (t = l(t, 8 * r.length));
    for (var u = Array(16), a = Array(16), f = 0; f < 16; f++) u[f] = 909522486 ^ t[f], 
    a[f] = 1549556828 ^ t[f];
    var c = l(u.concat(e(n)), 512 + 8 * n.length);
    return o(l(a.concat(c), 768));
}

function n(r) {
    for (var n = "", t = r.length, e = 0; e < t; e += 3) for (var o = r.charCodeAt(e) << 16 | (e + 1 < t ? r.charCodeAt(e + 1) << 8 : 0) | (e + 2 < t ? r.charCodeAt(e + 2) : 0), u = 0; u < 4; u++) 8 * e + 6 * u > 8 * r.length ? n += d : n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >>> 6 * (3 - u) & 63);
    return n;
}

function t(r) {
    for (var n, t, e = "", o = -1; ++o < r.length; ) n = r.charCodeAt(o), t = o + 1 < r.length ? r.charCodeAt(o + 1) : 0, 
    55296 <= n && n <= 56319 && 56320 <= t && t <= 57343 && (n = 65536 + ((1023 & n) << 10) + (1023 & t), 
    o++), n <= 127 ? e += String.fromCharCode(n) : n <= 2047 ? e += String.fromCharCode(192 | n >>> 6 & 31, 128 | 63 & n) : n <= 65535 ? e += String.fromCharCode(224 | n >>> 12 & 15, 128 | n >>> 6 & 63, 128 | 63 & n) : n <= 2097151 && (e += String.fromCharCode(240 | n >>> 18 & 7, 128 | n >>> 12 & 63, 128 | n >>> 6 & 63, 128 | 63 & n));
    return e;
}

function e(r) {
    for (var n = Array(r.length >> 2), t = 0; t < n.length; t++) n[t] = 0;
    for (t = 0; t < 8 * r.length; t += 8) n[t >> 5] |= (255 & r.charCodeAt(t / 8)) << 24 - t % 32;
    return n;
}

function o(r) {
    for (var n = "", t = 0; t < 32 * r.length; t += 8) n += String.fromCharCode(r[t >> 5] >>> 24 - t % 32 & 255);
    return n;
}

function u(r, n) {
    return r >>> n | r << 32 - n;
}

function a(r, n) {
    return r >>> n;
}

function f(r, n, t) {
    return r & n ^ ~r & t;
}

function c(r, n, t) {
    return r & n ^ r & t ^ n & t;
}

function h(r) {
    return u(r, 2) ^ u(r, 13) ^ u(r, 22);
}

function i(r) {
    return u(r, 6) ^ u(r, 11) ^ u(r, 25);
}

function g(r) {
    return u(r, 7) ^ u(r, 18) ^ a(r, 3);
}

function C(r) {
    return u(r, 17) ^ u(r, 19) ^ a(r, 10);
}

function l(r, n) {
    var t, e, o, u, a, l, d, m, y, S, s, w, b = new Array(1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225), p = new Array(64);
    for (r[n >> 5] |= 128 << 24 - n % 32, r[15 + (n + 64 >> 9 << 4)] = n, y = 0; y < r.length; y += 16) {
        for (t = b[0], e = b[1], o = b[2], u = b[3], a = b[4], l = b[5], d = b[6], m = b[7], 
        S = 0; S < 64; S++) p[S] = S < 16 ? r[S + y] : A(A(A(C(p[S - 2]), p[S - 7]), g(p[S - 15])), p[S - 16]), 
        s = A(A(A(A(m, i(a)), f(a, l, d)), v[S]), p[S]), w = A(h(t), c(t, e, o)), m = d, 
        d = l, l = a, a = A(u, s), u = o, o = e, e = t, t = A(s, w);
        b[0] = A(t, b[0]), b[1] = A(e, b[1]), b[2] = A(o, b[2]), b[3] = A(u, b[3]), b[4] = A(a, b[4]), 
        b[5] = A(l, b[5]), b[6] = A(d, b[6]), b[7] = A(m, b[7]);
    }
    return b;
}

function A(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
}

var d = "", v = new Array(1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998);

module.exports = {
    b64_hmac_sha256: function(e, o) {
        return n(r(t(e), t(o)));
    }
};