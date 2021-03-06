const code = [
    0x09, 0x00, 0x1c, 0x00, 0x28, 0x00, //__A: b.eq __C, a, 40
    0x0a, 0x01, 0x00, //MOV b, a
    0x02, 0x01, 0x00, 0x01, //ADD b, 0x100
    0x0b, 0x02, 0x01, //MOV c, [b]
    0x04, 0x02, 0x0d, 0x00, //MULT c, 13
    0x02, 0x02, 0x11, 0x00, //ADD c, 17
    0x0c, 0x01, 0x02, //MOV [b], c
    0x02, 0x00, 0x02, 0x00, //ADD a, 2
    0x08, 0xde, 0xff, //__B: jmp __A

    0x01, 0x00, 0x00, 0x00, //MOV a, 0
    0x09, 0x00, 0x1e, 0x00, 0x28, 0x00, //__A: b.eq __C, a, 40
    0x0a, 0x01, 0x00, //MOV b, a
    0x02, 0x01, 0x00, 0x01, //ADD b, 0x100
    0x0b, 0x02, 0x01, //MOV c, [b]
    0x02, 0x01, 0x00, 0x01, //ADD b, 0x100
    0x0b, 0x03, 0x01, //MOV d, [b]
    0x0d, 0x02, 0x03, 0x01, 0x00, //b.eq __B, b, c
    0xff, //trap
    0x02, 0x00, 0x02, 0x00, //ADD a, 2
    0x08, 0xdc, 0xff, //__B: jmp __A
    0xaa, //__C: trap
    0xaf,
];

function checkFlag(flag) {
    const mmu = new MMU([...code]);
    const enc = [2,6,245,5,63,5,141,5,254,4,76,5,80,6,50,5,154,5,2,6,228,4,76,5,245,5,228,4,15,6,89,5,37,5,141,5,228,4,106,6];
    for(let i = 0; i < 40; i++){
        mmu.writeByte(0x200 + i, enc[i]);
    }

    for(let i = 0; i < flag.length; i++){
        mmu.writeByte(0x100 + i * 2, flag.charCodeAt(i));
    }

    const cpu = new CPU(mmu);

    while(true) {
        try {
            cpu.evalInstr();
            console.log(JSON.stringify(cpu.regs.regs));
        }catch(e) {
            console.log(e);
            if(e === "invalid opcode: aa") {
                return true;
            }
            return false;
        }
    }
}