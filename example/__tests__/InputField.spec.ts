import { shallowMount } from "@vue/test-utils";
import InputField from "@/components/InputField.vue";

let timeout;

describe("InputField.vue", () => {
  it("Renders props value when passed", () => {
    const value = "new value";

    const wrapper = shallowMount(InputField, {
      props: { modelValue: value },
    });

    expect(wrapper.find("input").element.value).toBe(value);
  });

  it("InputField is disabled", () => {
    const wrapper = shallowMount(InputField, { props: { disabled: true } });

    expect(wrapper.find("input").element.disabled).toBe(true);
  });

  it("Checking that phone validation is correct", async () => {
    const wrapper = shallowMount(InputField, { props: { valid: "phone" } });

    await wrapper.find("input").setValue("test");

    timeout = setTimeout(() => {
      expect(wrapper.find(".input-field__error-list").html()).toContain(
        "Неверный формат телефона"
      );
    }, 500);
  });

  it("Checking that email validation is correct", async () => {
    const wrapper = shallowMount(InputField, { props: { valid: "email" } });

    await wrapper.find("input").setValue("test");

    timeout = setTimeout(() => {
      expect(wrapper.find(".input-field__error-list").html()).toContain(
        "Неверный формат email"
      );
    }, 500);
  });

  it("Checking that required validation is correct", async () => {
    const wrapper = shallowMount(InputField, {
      props: { required: true, label: "test" },
    });

    await wrapper.find("input").trigger("focus");

    timeout = setTimeout(() => {
      expect(wrapper.find(".input-field__error-list").html()).toContain(
        'Поле "test" обязательно для заполнения'
      );
    }, 500);
  });

  // it('Checking that input id is equals for "for" label attribute', async () => {
  //   const wrapper = shallowMount(InputField, { props: { label: 'test' } })
  //   const inputId = wrapper.find('.input-field__input').attributes('id')
  //   const labelFor = wrapper.find('.input-field__label').attributes('for')

  //   expect(inputId).toEqual(labelFor)
  // })
});

afterAll(() => {
  return clearTimeout(timeout);
});
