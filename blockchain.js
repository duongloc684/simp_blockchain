const crypto = require("crypto"); SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
class Block{
    constructor(time = "", data=[]){
        this.time = time;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nocne = 0;
    
    }
    getHash(){
        return SHA256(this.prevHash + this.time +JSON.stringify(this.data) +this.nocne);
    }

    mine(difficulty){
while(!this.hash.startsWith(Array(difficulty + 1).join("0"))){
    this.nocne++;
    this.hash = this.getHash();
}
    }
}

class Blockchain{
    constructor(){
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blocktime = 30000;
    }
    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(block){
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();

        block.mine(this.difficulty);
        this.chain.push(block);

        this.difficulty += Date.now() - parseInt(this.getLastBlock().time) < this.blocktime ? 1 : -1;
    }
    isValid(Blockchain = this){
        for(let i = 1; i < Blockchain.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = Blockchain.chain[i - 1];

            if(currentBlock.hash !== currentBlock.getHash() && prevBlock.hash !== currentBlock.prevHash){
                return false;
            }
        }
        return true;
    }
    
}

const Jechain = new Blockchain();
Jechain.addBlock(new Block(Date.now().toString(), ["hello","world"]));
console.log(Jechain);