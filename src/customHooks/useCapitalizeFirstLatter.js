import moment from "moment"


function useCapitalizeFirstLatter() {

    const CapitalizeFirstLatter = (date) => {

        const word = moment(date).format("MMMM YYYY")
        const firstLetter = word?.trim()?.charAt(0)
        const firstLetterCap = firstLetter?.toUpperCase()
        const remainingLetters = word?.slice(1)

        return firstLetterCap + remainingLetters
    }

    return {
        CapitalizeFirstLatter
    }
}

export default useCapitalizeFirstLatter
