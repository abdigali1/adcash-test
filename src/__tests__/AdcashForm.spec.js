import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AdcashForm from "@/components/AdcashForm.vue";

describe("AdcashForm", () => {
  const wrapper = mount(AdcashForm);
  it("rendery properly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(AdcashForm).toBeTruthy();
    expect(wrapper.text()).toContain("Type");
    expect(wrapper.text()).toContain("Rule");
  });
  it("'Reset' button behavior", async () => {
    expect(wrapper.findAll(".el-form-item label").at(0).text()).toContain(
      "Type"
    );
    const selectInput = wrapper.findAll(".el-select input").at(0);
    await selectInput.setValue(1);

    expect(wrapper.find(".el-button").text()).toContain("Reset");
    await wrapper.find(".el-button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("resetForm");
  });
});
