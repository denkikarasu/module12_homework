
class Device {
    constructor (options) {
        this.name = options.name;
        this.deviceType = options.deviceType || 'device';
        this.isOperable = (options.isOperable !== undefined) ? options.isOperable : true; // Есть ли более предпочтительный способ задать дефолтное значение типа Boolean?
        this.wattage = options.wattage;
        this.isOn = false;
    }

    getStatus() {
        console.log(`The ${this.name} is a ${this.deviceType}, consumes ${this.wattage} W, is`, this.isOperable ? 'operable,' : 'inoperable,', 'currently is', this.isOn ? 'on.' : 'off.', '\n');
    }

    getWattage() {
        console.log(`The ${this.name} consumes ${this.wattage} W`, this.isOn ? 'and is currently on.' : 'but is now off.', '\n');
        return this.isOn ? this.wattage : 0;
    }

    switchOn() {
        if (this.isOperable) {
            this.isOn = true;
            console.log(`The ${this.name} has been switched on.\n`);
            consumedPower += this.wattage;
            reportPowerUsage(); 
            return true;
        } else {
            console.log(`Sorry, the ${this.name} is inoperable. For your own safety please refrain from using defective devices!\n`);
            return false;
        }
    }

    switchOff() {
        if (this.isOn) {
            this.isOn = false;
            console.log(`The ${this.name} has been switched off.\n`);
            consumedPower -= this.wattage;
            reportPowerUsage();
            return true;
        } else {
            console.log(`The ${this.name} is already off.\n`);
            return false;
        }
    }

}

//============================
class Lamp extends Device {
    constructor(options) {
        super(options);
        this.name = options.name;
        this.deviceType = options.deviceType || 'lighting fixture';
        this.isOperable = (options.isOperable !== undefined) ? options.isOperable : true;
        this.wattage = options.wattage;
        this.isOn = false;
        this.bulbType = options.bulbType;
    }

    getStatus() {
        console.log(`The ${this.name} is a ${this.deviceType} with ${this.bulbType}, consumes ${this.wattage} W, is`, this.isOperable ? 'operable,' : 'inoperable,', 'currently is', this.isOn ? 'on.' : 'off.', '\n');
    }

    replaceBulb() {
        if (this.isOperable) {
            console.log('Why replace a good bulb? If it ain\'t broke don\'t fix it!\n');
            return false;
        } else {
            console.log(`The light bulb has been replaced, the ${this.name} is now operable.\n`);
            this.isOperable = true;
            return true;
        }
    }

}

//============================
class Computer extends Device {
    constructor(options) {
        super(options);
        this.name = options.name;
        this.deviceType = options.deviceType || 'computer';
        this.isOperable = options.isOperable || true;
        this.wattage = options.wattage;
        this.isOn = options.isOn || false;
        this.oS = options.oS;
    }

    switchOn() {
        if (this.isOperable) {
            this.isOn = true;
            console.log(`The ${this.name} has been switched on. Now booting...`);
            if (this.boot(3, 0)) { 
                consumedPower += this.wattage;
                reportPowerUsage(); 
                return true;
            } else { // если не загрузился с 3 попытки
                console.log(`The ${this.name} cannot be switched on. Gotta call Dad!\n`);
                reportPowerUsage();
                return false;
            }
            
        } else {
            console.log(`Sorry, the ${this.name} is inoperable. Gotta call Dad!\n`);
            return false;
        }
    }

    boot(bootAttempts, bootCounter) {
        let randomLuck = 0;
        while (bootCounter < bootAttempts) {
            randomLuck = Math.random();
            if (randomLuck > 0.7) { // ОЧЕНЬ старый компьютер))
                console.log(`OS ${this.oS} on the ${this.name} has booted successfully.\n`);
                return true;
            } else {
                bootCounter++;
                console.log(`Oops, boot failed. Rebooting...`);
            }
        }
        console.log(`Boot failed permanently.\n`);
        return false;
    }
    
}


//============================
function reportPowerUsage() {
    console.log(`Total consumed power is ${consumedPower} W.\n`);
}

let consumedPower = 0; 

//============================
const tableLamp = new Lamp({
    name: 'table lamp',
    deviceType: 'home lighting fixture',
    isOperable: false,
    wattage: 8,
    bulbType: 'LED lamp'        
});

const floorLamp = new Lamp({
    name: 'floor lamp',
    wattage: 40,
    bulbType: 'filament lamp'
})

const computer = new Computer({
    name: 'computer',
    deviceType: 'desktop',
    wattage: 400,
    oS: 'Windows'
})

//============================
// Вариант сюжета)

tableLamp.getStatus();
if (!tableLamp.switchOn()) {
    tableLamp.replaceBulb();
    tableLamp.switchOn();
}
tableLamp.replaceBulb();
computer.getStatus();

if (!computer.switchOn()) {
    console.log('\"Cool! Let\'s relax!\"\n');
    tableLamp.switchOff();
    floorLamp.switchOn();
} else {
    console.log(`\"No excuses left, gotta work...\"\n`);
}

