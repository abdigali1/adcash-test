import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/components/RadioButton.vue";

describe("RadioButton.vue", () => {
  it("Renders props value when passed", async () => {
    const value = "new value";

    const wrapper = shallowMount(RadioButton, {
      props: { value },
    });
    wrapper.find("input").trigger("change");

    expect(wrapper.find("input").element.value).toBe(value);
  });

  it("Pass label value from props", () => {
    const label = "new label";
    const value = "new value";

    const wrapper = shallowMount(RadioButton, {
      props: { value, label },
    });

    expect(wrapper.find(".radio-button__label").text()).toBe(label);
  });
});
