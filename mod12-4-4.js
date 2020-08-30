
function Device(name, isOperable, wattage, isOn) {
    this.name = name;
    this.deviceType = 'device';
    this.isOperable = isOperable;
    this.wattage = wattage;
    this.isOn = isOn;
}

Device.prototype.getStatus = function() {
    console.log(`The ${this.name} is a ${this.deviceType}, consumes ${this.wattage} W, is`, this.isOperable ? 'operable,' : 'inoperable,', 'currently is', this.isOn ? 'on.' : 'off.', '\n');
};

Device.prototype.getWattage = function() {
    console.log(`The ${this.name} consumes ${this.wattage} W`, this.isOn ? 'and is currently on.' : 'but is now off.', '\n');
    return this.isOn ? this.wattage : 0;
};

Device.prototype.switchOn = function() {
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
};

Device.prototype.switchOff = function() {
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
};


//============================
function Lamp(name, deviceType, bulbType, isOperable, wattage, isOn) {
    this.name = name;
    this.deviceType = deviceType;
    this.bulbType = bulbType;
    this.isOperable = isOperable;
    this.wattage = wattage;
    this.isOn = isOn;
}

Lamp.prototype = new Device();

Lamp.prototype.getStatus = function() {
    console.log(`The ${this.name} is a ${this.deviceType} with ${this.bulbType}, consumes ${this.wattage} W, is`, this.isOperable ? 'operable,' : 'inoperable,', 'currently is', this.isOn ? 'on.' : 'off.', '\n');    
}

Lamp.prototype.replaceBulb = function() {
    if (this.isOperable) {
        console.log('Why replace a good bulb? If it ain\'t broke don\'t fix it!\n');
        return false;
    } else {
        console.log(`The light bulb has been replaced, the ${this.name} is now operable.\n`);
        this.isOperable = true;
        return true;
    }
};



//============================
function Computer(name, deviceType, oS, isOperable, wattage, isOn) {
    this.name = name;
    this.deviceType = deviceType;
    this.isOperable = isOperable;
    this.wattage = wattage;
    this.isOn = isOn;
    this.oS = oS;
}

Computer.prototype = new Device();

Computer.prototype.switchOn = function() {
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
};

Computer.prototype.boot = function(bootAttempts, bootCounter) {
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
};


//============================
function reportPowerUsage() {
    console.log(`Total consumed power is ${consumedPower} W.\n`);
}

let consumedPower = 0; 


//============================
const tableLamp = new Lamp('table lamp', 'lighting fixture', 'LED lamp', false, 8, false);
const floorLamp = new Lamp('floor lamp', 'filament lamp', true, 40, false);

const computer = new Computer('computer', 'desktop', 'Windows', true, 400, false);


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


