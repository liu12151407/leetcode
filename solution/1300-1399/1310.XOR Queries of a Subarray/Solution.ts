function xorQueries(arr: number[], queries: number[][]): number[] {
    const n = arr.length;
    const s: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        s[i + 1] = s[i] ^ arr[i];
    }
    const ans: number[] = [];
    for (const [l, r] of queries) {
        ans.push(s[r + 1] ^ s[l]);
    }
    return ans;
}
