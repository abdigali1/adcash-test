import { shallowMount } from "@vue/test-utils";
import Button from "@/components/MainButton.vue";

describe("InputField.vue", () => {
  it("Checking that slot is working", () => {
    const wrapper = shallowMount(Button, { slots: { default: "test" } });

    expect(wrapper.html()).toContain("test");
  });

  it("Checking that full-width class is passed", () => {
    const wrapper = shallowMount(Button, { props: { fullWidth: true } });
    const buttonFullWidthClass = "main-button--full-width";

    expect(wrapper.classes()).toContain(buttonFullWidthClass);
  });

  it("Button is disabled", () => {
    const wrapper = shallowMount(Button, { props: { disabled: true } });

    expect(wrapper.find("button").element.disabled).toBe(true);
  });
});
