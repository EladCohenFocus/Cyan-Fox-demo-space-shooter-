function wave(lst=[])// example [[5,2,1],[4,1,1]]
{
    this.squadrons=[];
    this.waveActive=true;
    this.init=function()
    {
        let a=[];
        for (let x=0;x<lst.length;x++)
        {
            this.squadrons.push(new squadron(lst[x]))

        }
       

    }
    this.manage=function()
    {
         let active=false;
        for (let x=0;x<this.squadrons.length;x++)
        {
           
            if (this.squadrons[x].isSquadronActive())
            {
                active=true;
                this.squadrons[x].update();
                this.squadrons[x].show();
            }

        }
        this.waveActive=active;

    }
    
    this.init();

}
