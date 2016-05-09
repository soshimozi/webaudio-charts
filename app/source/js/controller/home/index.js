'use strict';
 
function HomeController(alertify) {
    
    var vm = this;
    
    vm.message = "and Hello from the controller too!";
    alertify.success('Alertify loaded correctly');
    
    vm.filterProps = {
        cutoff : '100',
        q: '.05',
        threshold: '.5'
    };
    
    vm.nodes = [
        { name: 'OSC1', key:'OSC1', type: 'oscillator', props: { freq: 200, detune: -1 } }
    ];
    
    vm.addElement = function() {
        vm.nodes.push({name: 'Low Pass Filter', key: 'FILTER1', type:'filter', props: { q: 0.5}});
    };
    
    vm.setProps = function() {
        console.log('we are setting props now');
        
        vm.filterProps.cutoff = '99';    
    };
}

// love our dependency injection and we are now safe from obfuscation
HomeController.$inject = ['alertify'];

module.exports = HomeController;
