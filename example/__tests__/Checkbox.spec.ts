import { shallowMount } from "@vue/test-utils";
import Checkbox from "@/components/MainCheckbox.vue";

let timeout;

describe("Checkbox.vue", () => {
  it("Renders props value when passed", async () => {
    const wrapper = shallowMount(Checkbox);
    await wrapper.find("input").setValue();

    expect(wrapper.find("input").element.checked).toBe(true);
  });

  it("Checking that label props is passed", async () => {
    const wrapper = shallowMount(Checkbox, { props: { label: "test" } });

    expect(wrapper.find(".main-checkbox__label").text()).toBe("test");
  });

  it("Checking that required validation is correct", async () => {
    const wrapper = shallowMount(Checkbox, {
      props: { required: true, label: "test" },
    });

    await wrapper.find("input").trigger("focus");

    timeout = setTimeout(() => {
      expect(wrapper.find(".input-field__error-list").html()).toContain(
        'Поле "test" обязательно для заполнения'
      );
    }, 500);
  });
});

afterAll(() => {
  return clearTimeout(timeout);
});
