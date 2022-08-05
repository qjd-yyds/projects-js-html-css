const prevMonthBtn = document.querySelector('#prev');
const nextMonthBtn = document.querySelector('#next');
const prevYearBtn = document.querySelector('#prev-year');
const nextYearBtn = document.querySelector('#next-year');
const nowDateText = document.querySelector('#now');
// 定义每个月的天数，闰月的话就是29天
function getDaysMonth(year = 2022) {
	const daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		daysMonth[1] = 29;
	}
	return daysMonth;
}

let nowYear = new Date().getFullYear();
let nowMonthIndex = new Date().getMonth();
let nowMonth = nowMonthIndex + 1;
let currentsDaysMonth = getDaysMonth(nowYear);
let days = currentsDaysMonth[nowMonthIndex];
// 获得月份的第一天是星期几
const getStartDay = (year, month) => {
	return new Date(year, month - 1, 1).getDay();
};
const splitArr = (arr, num = 7) => {
	return arr.reduce(
		(prev, cur) => {
			const len = prev.length;
			if (prev[len - 1].length < num) {
				prev[len - 1].push(cur);
			} else {
				prev[len] = [cur];
			}
			return prev;
		},
		[[]]
	);
};
// 渲染日期顶部
const renderDateHead = () => {
	const thead = document.querySelector('thead');
	const theadList = ['日', '一', '二', '三', '四', '五', '六'];

	let html = theadList
		.map(item => {
			return `<th>${item}</th>`;
		})
		.join('');
	html = `<tr>
  ${html}
  </tr>`;
	thead.innerHTML = html;
};
// 渲染日期内容
const renderDateBody = () => {
	const tbody = document.querySelector('tbody');
	let html = '';
	const totalArr = [];
	// 计算上月的日期需要渲染的部分
	const prev = getPrevDays(nowYear, nowMonth);
	totalArr.push(...prev);
	// 计算本月的日期需要渲染的部分
	for (let i = 1; i <= days; i++) {
		totalArr.push({
			type: 'normal',
			content: i
		});
	}
	// 计算下月的日期需要渲染的部分
	const next = getNextDays(nowYear, nowMonth);
	totalArr.push(...next);
	const list = splitArr(totalArr);
	list.forEach(item => {
		html += `<tr>${item
			.map(item => {
				return `<td>${item.content}</td>`;
			})
			.join('')}</tr>`;
	});
	tbody.innerHTML = html;
};
const renderCenterText = () => {
	nowDateText.innerText = `${nowYear}-${nowMonth}`;
};
// 计算上月的日期需要渲染的部分
const getPrevDays = (year, month) => {
	const preNum = getStartDay(year, month);
	const prevArr = [];
	for (let i = 0; i < preNum; i++) {
		const obj = {
			type: 'prev',
			content: ''
		};
		prevArr.push(obj);
	}
	return prevArr;
};
// 计算下月的日期需要渲染的部分
const getNextDays = (year, month) => {
	const nextNum = 6 - getStartDay(year, month + 1);
	const nextArr = [];
	for (let i = 0; i <= nextNum; i++) {
		const obj = {
			type: 'next',
			// content: i + 1
			content: ''
		};
		nextArr.push(obj);
	}
	return nextArr;
};
prevMonthBtn.addEventListener('click', () => {
	nowMonthIndex = nowMonthIndex - 1;
	if (nowMonthIndex < 0) {
		nowMonthIndex = 11;
		nowYear--;
	}
	nowMonth = nowMonthIndex + 1;
	currentsDaysMonth = getDaysMonth(nowYear);
	days = currentsDaysMonth[nowMonthIndex];
	render();
});

nextMonthBtn.addEventListener('click', () => {
	nowMonthIndex = nowMonthIndex + 1;
	if (nowMonthIndex >= 12) {
		nowMonthIndex = 0;
		nowYear++;
	}
	nowMonth = nowMonthIndex + 1;
	currentsDaysMonth = getDaysMonth(nowYear);
	days = currentsDaysMonth[nowMonthIndex];
	render();
});

prevYearBtn.addEventListener('click', () => {
	nowYear--;
	currentsDaysMonth = getDaysMonth(nowYear);
	days = currentsDaysMonth[nowMonthIndex];
	render();
});
nextYearBtn.addEventListener('click', () => {
	nowYear++;
	currentsDaysMonth = getDaysMonth(nowYear);
	days = currentsDaysMonth[nowMonthIndex];
	render();
});
const render = () => {
	renderDateHead();
	renderDateBody();
	renderCenterText();
};
render();
