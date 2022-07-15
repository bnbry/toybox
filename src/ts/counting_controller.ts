import { Controller } from "stimulus"

const DATA = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  21: "twenty-one",
  22: "twenty-two",
  23: "twenty-three",
  24: "twenty-four",
  25: "twenty-five",
  26: "twenty-six",
  27: "twenty-seven",
  28: "twenty-eight",
  29: "twenty-nine",
  30: "thirty",
  31: "thirty-one",
  32: "thirty-two",
  33: "thirty-three",
  34: "thirty-four",
  35: "thirty-five",
  36: "thirty-six",
  37: "thirty-seven",
  38: "thirty-eight",
  39: "thirty-nine",
  40: "forty",
  41: "forty-one",
  42: "forty-two",
  43: "forty-three",
  44: "forty-four",
  45: "forty-five",
  46: "forty-six",
  47: "forty-seven",
  48: "forty-eight",
  49: "forty-nine",
  50: "fifty",
  51: "fifty-one",
  52: "fifty-two",
  53: "fifty-three",
  54: "fifty-four",
  55: "fifty-five",
  56: "fifty-six",
  57: "fifty-seven",
  58: "fifty-eight",
  59: "fifty-nine",
  60: "sixty",
  61: "sixty-one",
  62: "sixty-two",
  63: "sixty-three",
  64: "sixty-four",
  65: "sixty-five",
  66: "sixty-six",
  67: "sixty-seven",
  68: "sixty-eight",
  69: "sixty-nine",
  70: "seventy",
  71: "seventy-one",
  72: "seventy-two",
  73: "seventy-three",
  74: "seventy-four",
  75: "seventy-five",
  76: "seventy-six",
  77: "seventy-seven",
  78: "seventy-eight",
  79: "seventy-nine",
  80: "eighty",
  81: "eighty-one",
  82: "eighty-two",
  83: "eighty-three",
  84: "eighty-four",
  85: "eighty-five",
  86: "eighty-six",
  87: "eighty-seven",
  88: "eighty-eight",
  89: "eighty-nine",
  90: "ninety",
  91: "ninety-one",
  92: "ninety-two",
  93: "ninety-three",
  94: "ninety-four",
  95: "ninety-five",
  96: "ninety-six",
  97: "ninety-seven",
  98: "ninety-eight",
  99: "ninety-nine",
  100: "one hundred",
}
const MIN_ADJACENT: number = 3;
const MAX_ADJACENT: number = 10;
const MIN_DISTANT: number = 11;
const NUMBERS: number[] = Object.keys(DATA).map(key => +key);
const MAX_DISTANT: number = Math.floor(NUMBERS.length / 2);
const MAX_NUMBER: number = NUMBERS[NUMBERS.length - 1];

export default class extends Controller {
  currentNumber!: number
  currentNumberTarget!: HTMLElement
  currentNumberWordTarget!: HTMLElement
  messageTarget!: HTMLElement
  mistakes!: number
  mistakesTarget!: HTMLElement
  numberOptionTargets!: HTMLElement[]

  static targets = [
    "currentNumber",
    "currentNumberWord",
    "message",
    "numberOption",
    "mistakes",
  ]

  connect() {
    this.currentNumber = 0;
    this.mistakes = 0;
  }

  selectNumber(e: Event) {
    e?.preventDefault();

    if (e?.currentTarget instanceof HTMLElement) {
      const el = e.currentTarget;

      if (el.hasAttribute("disabled")) {
        return;
      } else {
        const selectedNumber = +(el.dataset.number || -1);
        if(selectedNumber === this.currentNumber + 1) {
          this.handleSuccess(selectedNumber);
        } else {
          this.handleFailure(el);
        }
      }
    }
  }

  handleFailure(wrongChoice: HTMLElement) {
    wrongChoice.setAttribute("disabled", "");
    wrongChoice.textContent = "X";
    this.mistakes += 1;
    this.mistakesTarget.textContent = `${this.mistakes}`;
  }

  handleSuccess(newNumber: number) {
    this.currentNumber = newNumber;
    this.currentNumberTarget.textContent = `${this.currentNumber}`;
    this.currentNumberWordTarget.textContent = DATA[this.currentNumber as keyof typeof DATA];

    if (this.currentNumber >= MAX_NUMBER) {
      this.numberOptionTargets.forEach(option => {
        option.classList.add("hidden");
      });
     this.messageTarget.textContent = "Congratulations!!!";
    } else {
      const newOptions = this.getOptions(this.currentNumber);

      this.numberOptionTargets.forEach(option => {
        const optionValue = newOptions.pop();
        option.dataset.number = `${optionValue}`;
        option.textContent = `${optionValue}`;
        option.removeAttribute("disabled");
      });
    }
  }

  getOptions(currentNumber: number): number[] {
    const nextNumber = currentNumber + 1;
    let wrongAdjacentNumber, wrongDistantNumber;

    if (MAX_NUMBER - currentNumber > MAX_ADJACENT) {
      wrongAdjacentNumber = this.randomFromRange(currentNumber + MIN_ADJACENT, currentNumber + MAX_ADJACENT);
    } else {
      wrongAdjacentNumber = this.randomFromRange(currentNumber - MAX_ADJACENT, currentNumber - MIN_ADJACENT);
    }

    if (currentNumber > MAX_DISTANT) {
      wrongDistantNumber = this.randomFromRange(currentNumber - MAX_DISTANT, currentNumber - MIN_DISTANT);
    } else {
      wrongDistantNumber = this.randomFromRange(currentNumber + MIN_DISTANT, currentNumber + MAX_DISTANT);
    }

    return this.shuffle([nextNumber, wrongAdjacentNumber, wrongDistantNumber]);
  }

  shuffle(list: number[]): number[] {
    let currentIndex = list.length;
	  let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = list[currentIndex];
      list[currentIndex] = list[randomIndex];
      list[randomIndex] = temporaryValue;
    }

    return list;
  }

  randomFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
