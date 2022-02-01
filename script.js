


// Function to add body parts for incorrect guesses
function displayBodyParts() {
    if (!hangman.onePlayerLetters.includes(guessValue)) {
        wrong.innerHTML = '<p>$(guessValue)</p>';
        if (numberWrong.length == 1) {
            head.classList.remove('hidden')
            body.setAttribute("aria-label", "one of six body parts visible")
        }
        if (numberWrong.length == 2) {
            torso.classList.remove('hidden')
            body.setAttribute("aria-label", "two of six body parts visible")
        }
        if (numberWrong.length == 3) {
            leftArm.classList.remove('hidden')
            body.setAttribute("aria-label", "three of six body parts visible")
        }
        if (numberWrong.length == 4) {
            rightArm.classList.remove('hidden')
            body.SetAttribute("aria-label", "four of six body parts visible")
        }
        if (numberWrong.length == 5) {
            leftLeg.classList.remove('hidden')
            body.setAttribute("aria-label", "five of six body parts visible")
        }
        if (numberWrong.length == 6) {
            rightLeg.classList.remove('hidden')
            body.setAttribute("aria-label", "every part of the body visible")
        }
    }
}