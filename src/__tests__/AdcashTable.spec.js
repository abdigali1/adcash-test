import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AdcashTable from "@/components/AdcashTable.vue";

describe("AdcashTable", () => {
  const wrapper = mount(AdcashTable);
  it("rendery properly", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(AdcashTable).toBeTruthy();
    expect(wrapper.find("h2").text()).toContain("Saved targeting rules");
  });

  it("'Save changes' button behavior", async () => {
    expect(wrapper.find(".el-button").text()).toContain("Save changes");

    await wrapper.find(".el-button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("saveChanges");
    expect(wrapper.emitted("saveChanges")).toHaveLength(1);
  });
});
