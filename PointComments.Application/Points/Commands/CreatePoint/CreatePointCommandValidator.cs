using FluentValidation;

namespace PointComments.Application.Points.Commands.CreatePoint
{
    public class CreatePointCommandValidator : AbstractValidator<CreatePointCommand>
    {
        public CreatePointCommandValidator()
        {
            RuleFor(c => c.X)
                .NotEmpty().WithMessage("X is required.");

            RuleFor(c => c.Y)
                .NotEmpty().WithMessage("Y is required.");

            RuleFor(c => c.Radius)
                .InclusiveBetween(0, 100).WithMessage("Radius must be between 0 and 100");
        }
    }
}
