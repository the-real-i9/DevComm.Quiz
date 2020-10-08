import beginnerQs from '../questionStorage/beginnerQs.js';
import intermediateQs from '../questionStorage/intermediateQs.js';
import advancedQs from '../questionStorage/advancedQs.js';
import ninjaQs from '../questionStorage/ninjaQs.js';

const questions = {
    beginner: beginnerQs(),
    intermediate: intermediateQs(),
    advanced: advancedQs(),
    ninja: ninjaQs(),
};

export default questions;
