const minWidth = 100;
const slider = document.getElementById("slider");

let targetWidth = minWidth;
let upperThreshold = minWidth * 0.80;
let lowerThreshold = minWidth * 0.79;
let lastValue = 50;

slider.style.width = minWidth.toString() + "px";
slider.addEventListener('input', alwaysOutOfReach);

function slowlyApproachesZero(x) {
    return 1.0 / (0.01 * x + 1.0);
}

function alwaysOutOfReach(e) {
    const value = parseInt(e.target.value);
    const currentWidth = parseInt(slider.style.width.split("px")[0]);
    const dist = Math.abs(currentWidth - minWidth);
    const increasing = value > lastValue && value > upperThreshold;
    const decreasing = value < lastValue && value < lowerThreshold;
    
    if (increasing) {
        targetWidth = Math.ceil(value * (1 + 0.25 * slowlyApproachesZero(dist)));
        targetWidth = Math.max(targetWidth, currentWidth);
    }

    if (decreasing) {
        targetWidth = Math.floor(value * 1.4);
        targetWidth = Math.min(targetWidth, currentWidth);
        targetWidth = Math.max(targetWidth, minWidth);
    }

    if (increasing || decreasing) {
        slider.max = targetWidth;
        slider.style.width = targetWidth + "px";
        upperThreshold = (minWidth * 0.80) + Math.abs(targetWidth - minWidth) * 0.80;
        lowerThreshold = (minWidth * 0.79) + Math.abs(targetWidth - minWidth) * 0.70;
    }

    if (lowerThreshold > targetWidth || 
        upperThreshold > targetWidth) {
        // something went wrong
    }
    lastValue = value;
}