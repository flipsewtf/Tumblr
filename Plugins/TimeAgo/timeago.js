/*
TimeAgo Tumblr plugin
-  https://lushwave.tumblr.com
-  https://github.com/flipsewtf/TimeAgo
-  Version 1.0.0
-  Based on https://bychloethemes.tumblr.com/plugins/timeago
*/
(function () {
    function timeAgo(elements, options) {
        const defaults = {
            time: 'letter',
            spaces: false,
            words: false,
            prefix: '',
            suffix: ''
        };

        const settings = Object.assign({}, defaults, options);

        const now = Math.floor(new Date().getTime() / 1000);
        const hour = 3600;
        const day = 24 * hour;
        const week = 7 * day;
        const year = 52.18 * week;

        elements.forEach((element) => {
            const text = element.textContent;
            const timestamp = parseInt(text, 10);
            let difference = now - timestamp;
            let timeString = '';
            let unit = '';

            if (difference >= 0 && difference < 10) {
                unit += 'now';
            } else if (difference >= 10 && difference < 60) {
                timeString += difference;
                unit += 's';
            } else if (difference >= 60 && difference < hour) {
                timeString += Math.floor(difference / 60);
                unit += 'm';
            } else if (difference >= hour && difference < day) {
                timeString += Math.floor(difference / hour);
                unit += 'h';
            } else if (difference >= day && difference < week) {
                timeString += Math.floor(difference / day);
                unit += 'd';
            } else if (difference >= week && difference < year) {
                timeString += Math.floor(difference / week);
                unit += 'w';
            } else if (difference >= year) {
                timeString += Math.floor(difference / year);
                unit += 'y';
            }

            if (settings.time === 'short') {
                switch (unit) {
                    case 's':
                        unit = 'sec';
                        break;
                    case 'm':
                        unit = 'min';
                        break;
                    case 'h':
                        unit = 'hr';
                        break;
                    case 'd':
                        unit = 'day';
                        break;
                    case 'w':
                        unit = 'wk';
                        break;
                    case 'y':
                        unit = 'yr';
                        break;
                }
            } else if (settings.time === 'word') {
                switch (unit) {
                    case 's':
                        unit = 'second';
                        break;
                    case 'm':
                        unit = 'minute';
                        break;
                    case 'h':
                        unit = 'hour';
                        break;
                    case 'd':
                        unit = 'day';
                        break;
                    case 'w':
                        unit = 'week';
                        break;
                    case 'y':
                        unit = 'year';
                        break;
                }
            }

            if (timeString !== '1' && settings.time !== 'letter') {
                unit += 's';
            }

            if (settings.words) {
                const numbersToWords = [
                    '',
                    'one',
                    'two',
                    'three',
                    'four',
                    'five',
                    'six',
                    'seven',
                    'eight',
                    'nine',
                    'ten',
                    'eleven',
                    'twelve',
                    'thirteen',
                    'fourteen',
                    'fifteen',
                    'sixteen',
                    'seventeen',
                    'eighteen',
                    'nineteen'
                ];

                const tens = [
                    '',
                    '',
                    'twenty',
                    'thirty',
                    'forty',
                    'fifty',
                    'sixty',
                    'seventy',
                    'eighty',
                    'ninety'
                ];

                const num = Number(timeString);

                if (num < 20) {
                    timeString = '' + numbersToWords[num];
                } else if (num >= 20 && num < 100) {
                    const splitNum = timeString.split('');
                    timeString = '' + tens[splitNum[0]];
                    if (settings.spaces) {
                        timeString += ' ';
                    }
                    timeString += numbersToWords[splitNum[1]];
                } else {
                    timeString = 'out of range!';
                }
            }

            const result = (unit === 'now') ? unit : (settings.spaces ?
                settings.prefix + ' ' + timeString + ' ' + unit + ' ' + settings.suffix :
                settings.prefix + timeString + unit + settings.suffix);

            element.textContent = result;
        });
    }

    window.timeAgo = timeAgo;
})();
