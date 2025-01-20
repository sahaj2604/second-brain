export function random(len:number) {
    const randomString="fhuiegdvvnkobtkhKHFYRK!@#$%^&*()0987653412";
    let ans=""
    for(let i=0;i<len;i++){
        ans+=randomString[Math.floor(Math.random()*randomString.length)];
    }
    return ans;
}