/** 
Palsona Twitch Badge JS library for use in widgets and overlays
By: WolfwithSword
Palsonas by: Hoopy & HellPing
**/

class PalsonaLib {
    BASE_URL = "https://storage.googleapis.com/minawan-pics.firebasestorage.app";
    FILENAME = "api.json";
    
    constructor(palonaType) {
        this.palonaType = palonaType;
        this.palsonaData = {};
    }
    
    getUrl() {
        return `${this.BASE_URL}/${this.palonaType}/${this.FILENAME}`;
    }
    
    async fetchPalonas() {
        if (!this.palonaType) return;
        let sonas = await this.get(this.getUrl());
        if (sonas == null || sonas == undefined) {
            console.log("Could not load any palsonas. Not found.");
            return;
        }
        this.palsonaData = {};
        
        sonas.forEach(item => {
            if (item.approved && item.twitchUsername != undefined) {
                this.palsonaData[item.twitchUsername.toLowerCase()] = {
                    png64: item.png64,
                    png256: item.png256,
                    png512: item.png512,
                    original: item.original
                  };
              }
          });
          
          console.log(`Loaded ${Object.keys(this.palsonaData).length} palsonas`);
    }
    
    getPalsona(username) {
        return this.palsonaData[username.toLowerCase()];
    }
        
    async get(URL) {
      return await fetch(URL)
        .then(async res => {
          if (!res.ok) return null
          return res.json()
        })
        .catch(error => null);
    }
}
