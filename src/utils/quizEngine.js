import BeginnerQuizzes from './questions/beginner.json'
import IntermediateQuizzes from './questions/intermediate.json'
import AdvanceQuizzes from './questions/advance.json'
import { CustomMap } from './quick-funcs'

const QuestionObjectListFetcher = {
    beginner: BeginnerQuizzes,
    intermediate: IntermediateQuizzes,
    advance: AdvanceQuizzes,
    getList(...levels) {
        return levels.reduce((list, level) => {
            list.push(...this[level])
            return list
        }, [])
    }
}

const quizData = () => localStorage?.getItem('quiz-data') ? CustomMap.init(JSON.parse(localStorage.getItem('quiz-data'))) : new CustomMap()

const chunkIntoModules = (language, level) => {
    const questions = QuizEngine.getQuestionsInLevel(language, level)
    return questions.reduce((modules, question) => {
        if (!Object.keys(modules).length) {
            modules['Module 01'] = []
        }
        const lastModuleKey = Object.keys(modules).pop()
        const lastModule = modules[lastModuleKey]
        if (lastModule.length < 10) lastModule.push(question)
        else {
            // set the next module
            const moduleNum = parseInt(lastModuleKey.slice(lastModuleKey.indexOf(' ') + 1))
            modules[`Module ${(moduleNum + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`] = []
        }
        return modules
    }, {})
}
class QuizEngine {
    static getAllQuizLanguages() {
        return [...new Set(QuestionObjectListFetcher
            .getList('beginner', 'intermediate', 'advance')
            .map((obj) => obj.language))]
    }

    static getQuestionsInLevel(language, level) {
        return QuestionObjectListFetcher
        .getList(level)
        .filter((obj) => obj.language === language)
    }

    static getTotalQuestionsInLevel(language, level) {
        return QuizEngine.getQuestionsInLevel(language, level).length
    }

    static getLevelModuleKeys(language, level) {
        return Object.keys(chunkIntoModules(language, level))
    }
    
    static getLevelModuleQuestions({ language, level, module }) {
        return chunkIntoModules(language, level)[module]
    }

    static getLevelModuleTotalQuestions({ language, level, module }) {
        return QuizEngine.getLevelModuleQuestions({ language, level, module }).length
    }

    static setLevelCompletion({ language, level, completion }) {
        quizData().createNewElseUpdate({ keys:['level-completions', language], lastPair:[level, completion], storage: 'quiz-data' })
    }

    static getLevelCompletion(language, level) {
        const moduleScoresMap = quizData().composeGet('module-scores', language, level);
        if (moduleScoresMap) {
            let totalModulePercent = 0
            for (const v of moduleScoresMap.values()) {
                totalModulePercent += Number(v)
            }
            QuizEngine.setLevelCompletion({ language, level, completion: totalModulePercent / QuizEngine.getLevelModuleKeys(language, level).length })
        } else {
            QuizEngine.setLevelCompletion({ language, level, completion: 0 })
        }
        return quizData().composeGet('level-completions', language, level) || 0
    }

    static setModuleScore({ language, level, module, score }) {
        quizData().createNewElseUpdate({ keys:['module-scores', language, level], lastPair:[module, score], storage: 'quiz-data' })
    }

    static getModuleScore({ language, level, module }) {
        return quizData().composeGet('module-scores', language, level, module) || 0
    }

    static resetLevel(language, level) {
        quizData().createNewElseUpdate({keys: ['module-scores', language], lastPair:[level, new CustomMap()], storage: 'quiz-data'})
    }
}

export default QuizEngine
