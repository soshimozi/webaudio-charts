export default class {
    constructor() {
        this.filterProps = {
            cutoff : '100',
            q: '.05',
            threshold: '.5'
        };
        
        this.nodes = [
            { name: 'OSC1', key:'OSC1', type: 'oscillator', props: { freq: 200, detune: -1 } }
        ];
        
    }

    addElement() {
        this.nodes.push({name: 'Low Pass Filter', key: 'FILTER1', type:'filter', props: { q: 0.5}});
    };
    
    setProps() {
        console.log('we are setting props now');
        
        this.filterProps.cutoff = '99';    
    };
}

    
