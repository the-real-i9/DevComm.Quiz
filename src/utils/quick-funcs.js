class CustomMap extends Map {    
    static init(entries) {
        return new CustomMap(entries.reduce((ent, [k, v]) => {
            if(Array.isArray(v)) ent.push([k, CustomMap.init(v)])
            else ent.push([k, v])
            return ent;
        }, []))
    }

    * [Symbol.iterator]() {
        for (const [k, v] of this.entries()) {
            yield v instanceof CustomMap ? [k, [...v]] : [k, v]
        }
    }

    set(key, value) {
        super.set(key, value)
        return value instanceof CustomMap ? value : this
    }
    
    saveTo(storage) {
        localStorage.setItem(storage, JSON.stringify([...this]))
    }

    /* Wheew! This is some crazy refactoring stuff, you don't wanna hear it
        I want to set a key:value on a CustomMap instance, that value is the previous value for that key
        which is an instance of CustomMap, but if a previous value doesn't exist,
        it should set a new CustomMap(), then I want to get that CustomMap instance value
        that I set last(which may be previous or new), to set another key:value on it also,
        this goes on, provided that the value I want to set is an instance of a CustomMap,
        if not, then I want to set a lastKey:lastValue in which `lastValue instanceof CustomMap === false`,
        then finally save the newly generated CustomMap to localStorage.
        
        Goto, quizEngine.js and search for this method to see its use.
    */
    createNewElseUpdate({keys, lastPair, storage}) {
        keys.reduce((acc, key) => {
            return acc.set(key, acc.get(key) || new CustomMap())
        }, this).set(lastPair[0], lastPair[1])

        this.saveTo(storage)
    }

    composeGet(...keys) {
        const result = keys.reduce((acc, key) => {
            return acc.get(key) || new CustomMap()
        }, this)
        return result instanceof CustomMap && !result.size ? undefined : result
    }

    clear(storage) {
        super.clear()
        this.saveTo(storage)
    }
}

const formatLangText = (langText) => {
    if (langText === 'javascript') return 'JavaScript';
    if (langText === 'cs') return 'C#';
    if (langText === 'cplusplus') return 'C++';
    if (langText.length === 1) return langText.toUpperCase();
    return langText[0].toUpperCase() + langText.slice(1);
}

const unpackLink = (linkStr) => {
    if (!linkStr) return { valid: false, linkAddress: null, linkName: null }
    return { valid: true, linkAddress: getLinkAddress(linkStr), linkName: getLinkName(linkStr) }
}

const getLinkAddress = (str) => {
    const re = /\((.+)\)/gu;
    return re.test(str) ? (re.lastIndex = 0, re.exec(str)[1]) : null;
};

const getLinkName = (str) => {
    const re = /\[(.+)\]/gu;
    return re.test(str) ? (re.lastIndex = 0, re.exec(str)[1]) : null;
};

const markdownFormat = (text, language) => {
    const regexBold = /\*\*([^*]+)\*\*/gu;
    const regexItalic = /\*([^*]+)\*/gu;
    const regexUnderline = /__([^__]+)__/gu;
    const regexCode = /`([^`]+)`/gu;
    const formattedText = text
        .replace(regexBold, '<b>$1</b>')
        .replace(regexItalic, '<i>$1</i>')
        .replace(regexUnderline, '<u>$1</u>')
        .replace(regexCode, `<code class="${language}">$1</code>`);
    return formattedText;
}

export {
    formatLangText,
    unpackLink,
    markdownFormat,
    CustomMap,
}