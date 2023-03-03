
const findIndexFromPosition = (arr, index, callback) => {
    return arr.findIndex((value, searchIndex, arr) => searchIndex <= index ? false : callback(value, searchIndex, arr));
}


const fnName = 'frontend_p2p_pods';
const injectPodFnLine = `def ${fnName}`;


/**
 * 
 * @param {string[]} podLines 
 */
const findAndInjectIntoApp = (podLines) => {
    const appTargetIndex = podLines.findIndex((line) => line.trim().startsWith("target"));

    if (appTargetIndex === -1) {
        return podLines;
    }

    const appTargetEnd = findIndexFromPosition(podLines, appTargetIndex, (value) => value.trim() === 'end');

    if (appTargetEnd === -1) {
        return podLines;
    }

    const previousInstallation = findIndexFromPosition(podLines, appTargetIndex, (value, index) => index <= appTargetEnd ? value.trim() === fnName : false);

    if (previousInstallation !== -1) {
        return podLines;
    }


    const podLinesCopy = [...podLines];
    podLinesCopy.splice(appTargetIndex + 1, 0, fnName);
    return podLinesCopy;
}

/**
 * 
 * @param {string[]} podLines 
 * @param {string[]} podTargetLines 
 */
const injectPodFn = (__podLines, podTargetLines) => {
    const podLines = [...__podLines];

    let installPosition = podLines.findIndex((line) => line.trim() === injectPodFnLine);

    if (installPosition === -1) {
        const installLine = podLines.findIndex((line) => line.trim().startsWith('install!'))

        if (installLine === -1) {
            throw new Error("Cannot inject...");
        }

        podLines.splice(installLine + 1, 0, 'def frontend_p2p_pods', 'end');
        installPosition = installLine + 1;
    }

    const deleteLineIndex = findIndexFromPosition(podLines, installPosition, (line) => line.trim() === 'end');

    if (deleteLineIndex === -1) {
        throw new Error("Delete line not found...");
    }

    podLines.splice(installPosition + 1, deleteLineIndex - 1 - installPosition, ...podTargetLines)
    return podLines;
}

const injectPodInformation = (pod, podTargetLines) => {

    const podLines = pod.split("\n");

    console.log(podLines);

    const podLinesWithInjectedFn = injectPodFn(podLines, podTargetLines);

    const podLinesWithAll = findAndInjectIntoApp(podLinesWithInjectedFn);

    return podLinesWithAll.join("\n");
}

module.exports = injectPodInformation;