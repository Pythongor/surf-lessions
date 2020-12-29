(function() {
    const surfBoard = document.getElementById('surf-board');
    const hero = document.querySelector('.hero');
    const backgroundImage = document.querySelector('.background-container__image');
    const backgroundContainer = document.querySelector('.background-container');
    const overflowedContainer = document.querySelector('.overflowed-container');
    const eventsBlock = document.querySelector('.events');
    let eventsBlockHeightModificator
    window.onresize = function( event ) {
        resizeSurfBoard();
        moveEventsBlock();
        
    };
    if (performance.navigation.type == 1) {
        eventsBlockHeightModificator = 0
        resizeSurfBoard();
        moveEventsBlock();
    }

    function resizeSurfBoard () {
        const height = hero.offsetHeight * 1.5
        const width = height * 352 / 1076
        surfBoard.style.height = `${height}px`
        surfBoard.style.width = `${width}px`
    }

    function onStart() {
        const start = Date.now();
        const timer = setInterval(function() {
            let timePassed = Date.now() - start;
            moveHero(timePassed);
            rotateSurfBoard(timePassed);
            removeOpacity(timePassed);
            moveEventsBlock(timePassed);
            if (timePassed > 2000) {
                clearInterval(timer);
                afterStart();
            };
        }, 20);
    }

    function moveHero(timePassed) {
        const heroStart = hero.style.left = 450 - hero.offsetWidth + 'px'
        const step = (82 - Number.parseFloat(heroStart)) / 2000
        hero.style.left = Number.parseFloat(heroStart) + timePassed * step + 'px';
    }

    function rotateSurfBoard(timePassed) {
        const deg = 90 - (90 / 2000 * timePassed);
        surfBoard.style.transform = `translateX(60%) rotate(${deg}deg)`
    }

    function removeOpacity(timePassed) {
        const opacity = 0.05 * timePassed + '%';
        [backgroundContainer, overflowedContainer, eventsBlock].forEach(function(obj) {
            obj.style.opacity = opacity
        });
    }

    function moveEventsBlock(timePassed = -(eventsBlockHeightModificator * 13)) {
        eventsBlockHeightModificator = -(timePassed / 13);
        const heroBottom = hero.getBoundingClientRect().bottom + pageYOffset
        eventsBlock.style.top = heroBottom + eventsBlockHeightModificator + 'px'
    }

    function afterStart (direction=1, fromMiddle=true) {
        const start = Date.now();
        const timer = setInterval(function() {
            let timePassed = Date.now() - start;
            swayBackgroundImage(timePassed, direction, fromMiddle);
            swaySurfBoard(timePassed, direction, fromMiddle);
            if (timePassed > 2000) {
                clearInterval(timer);
                const states = [[1, true], [-1, false], [-1, true], [1, false], [1, true]]
                const str_states = states.map((x) => String(x))
                const index = str_states.indexOf(String([direction, fromMiddle]));
                const new_state = states[index + 1]
                afterStart(...new_state);
            };
        }, 20);
    }

    function swayBackgroundImage(timePassed, direction, fromMiddle) {
        let deg
        if (fromMiddle) {
            deg = 5 / 2000 * timePassed * direction;
        } else {
            deg = -(5 - (5 / 2000 * timePassed)) * direction;
        }
        console.log(deg);
        backgroundImage.style.transform = `rotate(${deg}deg)`
    }

    function swaySurfBoard(timePassed, direction, fromMiddle) {
        let deg
        if (fromMiddle) {
            deg = -(12 / 2000 * timePassed * direction);
        } else {
            deg = (12 - (12 / 2000 * timePassed)) * direction;
        }
        surfBoard.style.transform = `translateX(60%) rotate(${deg}deg)`
    }

    onStart();
}) ();

