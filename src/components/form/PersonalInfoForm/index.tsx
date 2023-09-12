import { Input } from "@/components/ui/input";

import FormWrapper from "../FormWrapper";
import { Label } from "@/components/ui/label";
import { AllFormValues } from "@/pages/Signup";
type stepProps = AllFormValues & {
  updateForm: (fieldToUpdate: Partial<AllFormValues>) => void;
};
export default function PersonalInfoForm({
  phone,
  address,
  profile,
  updateForm,
}: stepProps) {
  return (
    <FormWrapper
      title="Personal info"
      description="Please provide your profile pic, address, and phone number."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="phone">
            Phone
          </Label>
          <Input
            autoFocus
            type="number"
            name="phone"
            id="phone"
            placeholder="e.g. +90 555 555 55 55"
            value={phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="adress">
            Enter your address
          </Label>
          <Input
            autoFocus
            type="text"
            name="city"
            id="city"
            placeholder="e.g. City "
            value={address.city}
            onChange={(e) =>
              updateForm({ address: { ...address, city: e.target.value } })
            }
            className="w-full text-white"
            required
          />
          <Input
            autoFocus
            type="text"
            name="country"
            id="country"
            placeholder="e.g. Country"
            value={address.country}
            onChange={(e) =>
              updateForm({
                address: { ...address, country: e.target.value },
              })
            }
            className="w-full text-white"
            required
          />
          <Input
            autoFocus
            type="text"
            name="details"
            id="details"
            placeholder="e.g. Details"
            value={address.details}
            onChange={(e) =>
              updateForm({
                address: { ...address, details: e.target.value },
              })
            }
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="profile">
            Profile Picture
          </Label>
          <div className="flex ">
            <Input
              type="url"
              name="profile"
              id="profile"
              placeholder="e.g. stephenking@lorem.com"
              value={profile}
              className="w-full text-white"
              onChange={(e) => updateForm({ profile: e.target.value })}
              required
            />
            <span
              onClick={() =>
                updateForm({
                  profile: `https://placekitten.com/200/${
                    Math.floor(Math.random() * 200) + 100
                  }`,
                })
              }
              className="text-white ml-2 text-center cursor-pointer"
            >
              Get Rand Image
            </span>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
