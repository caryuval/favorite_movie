import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Vue from "vue";

const TEST_IDS = {
	noResultId: "noResult",
	nameInputId: "nameInput",
	ratingsInputId: "ratingsInput",
	durationInputId: "durationInput",
	addButtonId: "addButton",
	listId: "moviesList",
	listItemId: "movieListItem",
	searchId: "search",
	alertId: "alert",
};

describe("Favorite Movie Directory", () => {
	let app;
	let getByTestId;
	let getAllByTestId;
	let getNoResult;
	let queryNoResult;
	let nameInput;
	let ratingsInput;
	let durationInput;
	let addButton;
	let list;
	let listItems;
	let queryList;
	let search;
	let alert;

	beforeEach(() => {
		app = mount(App);
		//getByTestId = app.getByTestId;
		getByTestId = (id) => app.find(`[data-testid="${id}"]`);
		getAllByTestId = (id) => app.findAll(`[data-testid="${id}"]`);
		nameInput = getByTestId(TEST_IDS.nameInputId);
		ratingsInput = getByTestId(TEST_IDS.ratingsInputId);
		durationInput = getByTestId(TEST_IDS.durationInputId);
		addButton = getByTestId(TEST_IDS.addButtonId);
		search = getByTestId(TEST_IDS.searchId);
		queryList = getByTestId(TEST_IDS.listId);
		queryNoResult = getByTestId(TEST_IDS.noResultId);
	});

	const addMovie = (name, ratings, duration) => {
		nameInput.setValue(name);
		ratingsInput.setValue(ratings);
		durationInput.setValue(duration);
		addButton.trigger("click");
	};

	const addMoviesSet = () => {
		addMovie("Toy Story", "90", "1.5h");
		addMovie("Beauty and the Beast", "86", "1.8h");
		addMovie("North by Northwest", "84", "2.2h");
		addMovie("Gravity", "78", "2h");
		addMovie("Notorious", "60", "1.4h");
	};

	it("should not initially show the no result message or list", () => {
		expect(queryList.exists()).toBeFalsy();
		expect(queryNoResult.exists()).toBeFalsy();
	});

	it("should add a row with valid data and not show the no result message", async () => {
		addMovie("Star Wars", "95", "3h");
		await Vue.nextTick();
		list = getByTestId(TEST_IDS.listId);
		expect(list.text()).toBe("Star Wars Ratings: 95/100 3 Hrs");
		expect(queryNoResult.exists()).toBeFalsy();
	});

	it("should not add the row if name or ratings or duration is empty", async () => {
		addMovie("The Platform", "40", "1.5h");
		await Vue.nextTick();
		list = getByTestId(TEST_IDS.listId);
		expect(list.text()).toBe("The Platform Ratings: 40/100 1.5 Hrs");
		addMovie("", "90", "1.5h");
		addMovie("The Irishman", "", "2.2h");
		addMovie("Annihilation", "70", "");
		await Vue.nextTick();
		list = getByTestId(TEST_IDS.listId);
		listItems = getAllByTestId(TEST_IDS.listItemId);
		expect(listItems.length).toEqual(1);
	});

	it("should add duration in hours if entered in minutes", async () => {
		addMovie("Casablanca", "95", "170m");
		await Vue.nextTick();
		list = getByTestId(TEST_IDS.listId);
		expect(list.text()).toContain("2.8 Hrs");
	});

	it("should not add the row if data invalid", async () => {
		addMovie("Antman", "99", "2h");
		await Vue.nextTick();
		list = getByTestId(TEST_IDS.listId);
		expect(list.text()).toEqual("Antman Ratings: 99/100 2 Hrs");
		addMovie("Harry Potter", "100", "3w");
		await Vue.nextTick();
		listItems = getAllByTestId(TEST_IDS.listItemId);
		expect(listItems.length).toEqual(1);
	});

	it("should show alert message if duration data invalid", async () => {
		addMovie("Harry Potter", "100", "3w");
		await Vue.nextTick();
		alert = getByTestId(TEST_IDS.alertId);
		expect(alert.text()).toEqual(
			"Please specify time in hours or minutes (e.g. 2.5h or 150m)"
		);
	});

	it("should hide alert message after user starts typing in some input", async () => {
		addMovie("Harry Potter", "100", "3w");
		await Vue.nextTick();
		alert = getByTestId(TEST_IDS.alertId);
		expect(alert.exists()).toBeTruthy();
		nameInput.trigger("keydown");
		nameInput.trigger("keyup");
		nameInput.setValue("Home");
		await Vue.nextTick();
		alert = getByTestId(TEST_IDS.alertId);
		expect(alert.exists()).toBeFalsy();
	});

	it("should add multiple rows in sorted order", async () => {
		addMoviesSet();
		await Vue.nextTick();
		listItems = getAllByTestId(TEST_IDS.listItemId);
		expect(listItems.at(1).text()).toContain("2 Hrs");
		expect(listItems.at(2).text()).toContain("1.8 Hrs");
		expect(listItems.at(3).text()).toContain("1.5 Hrs");
	});

	it("should start search when at least 2 characters are entered", async () => {
		addMoviesSet();
		search.setValue("g");
		await Vue.nextTick();
		list = getAllByTestId(TEST_IDS.listItemId);
		expect(list.length).toEqual(5);
		search.setValue("gr");
		await Vue.nextTick();

		listItems = getAllByTestId(TEST_IDS.listItemId);
		expect(listItems.length).toEqual(1);
		expect(listItems.at(0).text()).toContain("Gravity");
	});

	it("should filter movies by starting characters", async () => {
		addMoviesSet();

		search.setValue("no");
		await Vue.nextTick();
		listItems = getAllByTestId(TEST_IDS.listItemId);
		expect(listItems.at(0).text()).toContain("North by Northwest");
		expect(listItems.at(1).text()).toContain("Notorious");

		search.setValue("not");
		await Vue.nextTick();
		listItems = getAllByTestId(TEST_IDS.listItemId);
		expect(listItems.at(0).text()).toContain("Notorious");
	});

	it("should show no result message and not show list when the search returns no match", async () => {
		addMoviesSet();
		search.setValue("tr");
		await Vue.nextTick();
		getNoResult = getByTestId(TEST_IDS.noResultId);
		expect(getNoResult.text()).toEqual("No Results Found");
		expect(queryList.exists()).toBeFalsy();
	});
});
