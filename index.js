// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }

  const pAequorFactory = (num, dnaArray) => {

    return {
        specimenNum: num,
        dna: dnaArray,
        mutate () {

            let mutatedStrand =  dnaArray;

            let randomIndex = Math.floor(Math.random() * this.dna.length + 1);
            let randBase = (this.dna[randomIndex]);

            let mutatedBase = returnRandBase();
            while (randBase === mutatedBase) {
                mutatedBase = returnRandBase();
            }

            mutatedStrand[randomIndex] = mutatedBase;
            return mutatedStrand;
        },
        compareDNA (pAequor) {

          let numOfSimilar = 0;

          for (let i = 0; i < pAequor.dna.length; i++) {
            if (pAequor.dna[i] === this.dna[i]) {
              numOfSimilar++;
            }
          }

          let percentageSimilar = ((numOfSimilar / 15) * 100).toFixed();

          return `Specimen ${pAequor.specimenNum} and Specimen ${this.specimenNum} have ${percentageSimilar}% DNA in common.`;
        },
        willLikelySurvive () {

          let survivalBase = 0;

          for (base of this.dna) {
            if (base === 'G' || base === 'C') {
              survivalBase++;
            }
          }
          if (survivalBase / 15 >= 0.60) {
            return true;
          } else {
            return false;
          }
        }
    }
  }


const create30SurvivingSpecimens = () => {

  let survivingSpecimenArray = [];
  let numberOfSpecimens = 0;
  let specimenNumber = 0;

  while (numberOfSpecimens <= 30) {
    
    let currentSpecimen = pAequorFactory(specimenNumber,mockUpStrand())

    if (currentSpecimen.willLikelySurvive()) {
      survivingSpecimenArray.push(currentSpecimen)
      numberOfSpecimens++;
      specimenNumber++;
    }
  }

  return survivingSpecimenArray;
}


