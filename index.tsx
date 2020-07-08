import React from "react";

export type RenderLabelDefault = (props?: any) => React.ReactNode;
export type RenderInputDefault = (props?: any) => React.ReactNode;
export type RenderHintDefault = (props?: any) => React.ReactNode;
export type RenderDefault = (props: {
  renderLabel: RenderLabelDefault;
  renderInput: RenderInputDefault;
  renderHint: RenderHintDefault;
}) => (props?: any) => React.ReactNode;
export type RenderLabelCustom = (fn?: RenderLabelDefault) => React.ReactNode;
export type RenderInputCustom = (fn: RenderInputDefault) => React.ReactNode;
export type RenderHintCustom = (fn?: RenderHintDefault) => React.ReactNode;
export type RenderCustom = (
  fn: (props?: any) => React.ReactNode,
  props: {
    renderLabel: RenderLabelDefault;
    renderInput: RenderInputDefault;
    renderHint: RenderHintDefault;
  }
) => React.ReactNode;

interface FieldProps {
  renderLabelDefault?: RenderLabelDefault;
  renderInputDefault: RenderInputDefault;
  renderHintDefault?: RenderHintDefault;
  renderDefault: RenderDefault;
  renderLabelCustom?: RenderLabelCustom;
  renderInputCustom?: RenderInputCustom;
  renderHintCustom?: RenderHintCustom;
  renderCustom?: RenderCustom;
}

export const Field: React.FC<FieldProps> = ({
  renderDefault,
  renderLabelDefault,
  renderInputDefault,
  renderHintDefault,
  renderCustom,
  renderLabelCustom,
  renderInputCustom,
  renderHintCustom
}) => {
  const renderLabel = React.useCallback(
    () =>
      renderLabelCustom
        ? renderLabelCustom(renderLabelDefault)
        : renderLabelDefault && renderLabelDefault(),
    [renderLabelCustom, renderLabelDefault]
  );

  const renderInput = React.useCallback(
    () =>
      renderInputCustom
        ? renderInputCustom(renderInputDefault)
        : renderInputDefault(),
    [renderInputCustom, renderInputDefault]
  );

  const renderHint = React.useCallback(
    () =>
      renderHintCustom
        ? renderHintCustom(renderHintDefault)
        : renderHintDefault && renderHintDefault(),
    [renderHintCustom, renderHintDefault]
  );

  const render = React.useCallback(
    () =>
      renderCustom
        ? renderCustom(
            renderDefault({ renderLabel, renderInput, renderHint }),
            {
              renderLabel,
              renderInput,
              renderHint
            }
          )
        : renderDefault({ renderLabel, renderInput, renderHint })({}),
    [renderCustom, renderDefault, renderLabel, renderInput, renderHint]
  );

  return <>{render()}</>;
};
